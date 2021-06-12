import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import {
  Home,
  CourseDetails,
  LoginSignup,
  Dashboard,
  UserType,
  NewCourse,
} from "../pages";

export function MainContainer() {
  const [selectedUserType, setSelectedUserType] = useState(null);

  const tutorSelected = () => {
    setSelectedUserType("tut");
  };

  const studentSelected = () => {
    setSelectedUserType("stu");
  };

  return (
    <div className="mainContainer">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/details/:id" component={CourseDetails} />
        <Route path="/auth">
          <LoginSignup selectedUserType={selectedUserType} />
        </Route>
        <Route path="/usertype">
          <UserType
            tutorSelected={tutorSelected}
            studentSelected={studentSelected}
          />
        </Route>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/newcourse" component={NewCourse} />
      </Switch>
    </div>
  );
}
