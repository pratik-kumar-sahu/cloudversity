const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const Student = require('../Model/student');
const Course = require('../Model/course');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {

    signUp: async (req, res) => {
        try {
            const studentData = req.body;

            let student = await Student.findOne({ email: req.body.email });
            if (student) {
                return res.send({ message: "This email is already registered, try sign in", error: "Email already in use" });
            };

            student = new Student({
                ...studentData
            });
            // --- hashing the password --- /
            const hashedPassword = await bcrypt.hash(studentData.password, 10);
            student.password = hashedPassword;

            const token = await jwt.sign({ id: student._id, email: student.email }, process.env.JWT_SECRET, { expiresIn: "6h" });
            await student.save();

            res.send({ message: "Student registered successfully", data: student, token });

        } catch (error) {

            console.log("Error: ", error);
            res.send({ message: "Error while signing up", error: error.message });
        };
    },

    login: async (req, res) => {
        try {

            const student = await Student.findOne({ email: req.body.email })
                .populate("wishlist")
                .populate("enrolledCourses")
                .populate("lastViewedCourse", ["courseName", "authorName"])
                .populate("cart")
                .populate("yourReviews").exec();

            console.log("Student obj from student Login: ", student);

            if (!student) {
                return res.send({ message: "This email is not registered with us, please signup first!", error: "Email not registered" });
            };

            // --- Validatig password using bcryptjs --- /
            const isValidPassword = await bcrypt.compare(req.body.password, student.password);

            if (!isValidPassword) {
                return res.send({ message: "Invalid Password", error: "Invalid Password" });
            };

            // --- Generating JWT --- /
            const token = await jwt.sign({ id: student._id, email: student.email }, process.env.JWT_SECRET, { expiresIn: "6h" });
            // res.cookie('token', token, { httpOnly: true, maxAge: 1000000 });   // not saving the token in cookie now

            res.status(200).send({ message: "Student successfully logged in", data: student, token });

        } catch (error) {

            console.log("Error during Login ==> ", error);
            res.send({ message: "Error during Login", error: error.message });
        };
    },

    getAllStudents: async (req, res) => {
        try {
            const students = await Student.find().populate();
            if (!students) {
                return res.send("No students found");
            };
            res.status(200).send({
                message: "Student list fetched successfully",
                data: students,
            });
        } catch (err) {
            console.log("Error while fetching the student list", error);
            res.status(500).send({ message: "Couldn't fetch the list of students", error: error.message });
        };
    },

    getSingleStudent: async (req, res) => {
        try {
            const studentInfo = await Student.findById({ _id: req.params.studentId })
                .populate([{ path: "wishlist", select: ["courseName", "thumbnail", "price", "rating"], populate: { path: "authorName", model: "tutor", select: ["firstName", "lastName"] } }])
                .populate([{ path: "cart", select: ["courseName", "thumbnail", "price", "rating"], populate: { path: "authorName", model: "tutor", select: ["firstName", "lastName"] } }])
                .populate("enrolledCourses").exec();

            // console.log("Student Info: ", studentInfo)

            res.status(200).send({ message: "Fetched Student details: ", studentInfo });

        } catch (error) {
            console.log("Error while fetching the student info", error);
            res.status(500).send({ message: "Couldn't fetch the info of student", error: error.message });
        };
    },

    addToWishlist: async (req, res) => {
        try {

            const courseToWishlist = await Course.findById({ _id: req.params.courseId });

            const student = await Student.findById({ _id: req.user.id });

            if (!student.wishlist.includes(courseToWishlist._id) && !student.enrolledCourses.includes(courseToWishlist._id)) {
                student.wishlist.push(courseToWishlist._id);
                courseToWishlist.wishlistedBy.push(req.user.id);
                await student.save();
                await courseToWishlist.save();
                console.log("Student", student);
                res.status(200).send({ message: "Added the course to wishlist", wishListed: courseToWishlist, student });
            } else {
                res.status(200).send({ message: "You've either Enrolled to this course or Course is already added to the wishlist" });
            };


        } catch (error) {
            console.log("Error while adding to wishlist", error);
            res.status(500).send({ message: "Couldn't add the item to wishlist", error: error.message });
        };
    },

    removeFromWishlist: async (req, res) => {
        try {

            const removeFromWishlist = await Course.findById({ _id: req.params.courseId });

            const student = await Student.findById({ _id: req.user.id });

            const indexOfCourse = student.wishlist.indexOf(removeFromWishlist._id);
            if (indexOfCourse > -1) {
                student.wishlist.splice(indexOfCourse, 1);
                await student.save();
            } else {
                res.status(200).send({ message: "Course not found in wishlist", removedItem: removeFromWishlist });

            };

            const indexOfStudent = removeFromWishlist.wishlistedBy.indexOf(req.user.id);
            if (indexOfStudent > -1) {
                removeFromWishlist.wishlistedBy.splice(indexOfStudent, 1);
                await removeFromWishlist.save();
            } else {
                res.status(200).send({ message: "Student has not wishlisted this course", removedItem: removeFromWishlist });
            };

            res.status(200).send({ message: "Course removed from wishlist", removedItem: removeFromWishlist });

        } catch (error) {
            console.log("Error while removing to wishlist", error);
            res.status(500).send({ message: "Couldn't remove the item to wishlist", error: error.message });
        };
    },

    addToCart: async (req, res) => {
        try {

            const courseToAdd = await Course.findById({ _id: req.params.courseId });
            const student = await Student.findById({ _id: req.user.id });

            if (!student.cart.includes(courseToAdd._id) && !student.enrolledCourses.includes(courseToAdd._id)) {

                student.cart.push(courseToAdd._id);
                await student.save();
                res.status(200).send({ message: "Added the course to cart", cart: student.cart });
            } else {
                res.status(200).send({ message: "You've either enrolled to this course or item is already added to cart" });
            }


        } catch (error) {
            console.log("Error while adding item to cart", error);
            res.status(500).send({ message: "Couldn't adding the item to cart", error: error.message });
        };
    },

    removeFromCart: async (req, res) => {
        try {

            const courseToRemove = await Course.findById({ _id: req.params.courseId });
            const student = await Student.findById({ _id: req.user.id });

            const indexOfCourse = student.cart.indexOf(courseToRemove._id);
            if (indexOfCourse > -1) {
                student.cart.splice(indexOfCourse, 1);
                await student.save();
                res.status(200).send({ message: "Course removed from cart" });
            } else {
                res.status(200).send({ message: "Course not present in cart" });
            };

        } catch (error) {
            console.log("Error while removing item from cart", error);
            res.status(500).send({ message: "Couldn't removing the item from cart", error: error.message });
        };
    },

    getLatestCourse: async (req, res) => {
        try {

            const lastViewedCourse = await Course.findById({ _id: req.params.courseId });

            const student = await Student.findById({ _id: req.user.id });

            const indexOfCourse = student.lastViewedCourse.indexOf(lastViewedCourse._id);
            if (indexOfCourse >= 0) {
                student.lastViewedCourse.splice(indexOfCourse, 1);
            };

            student.lastViewedCourse.push(lastViewedCourse._id);

            await student.save();

            res.status(200).send({ message: "Updated the recently viewed course", lastViewedCourse });

        } catch (error) {

            console.log("Error while adding item to last viewed", error);
            res.status(500).send({ message: "Couldn't updated the last viwed course", error: error.message });
        };
    }

}