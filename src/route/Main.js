import React, { useState } from 'react';
import { BrowserRouter as Switch } from 'react-router-dom';
import MainLayout from '../layout/main/Main';

import MainView from '../views/Main';
import DashboardView from '../views/Dashboard';
import PostView from '../views/post/Post';
import CategoryView from '../views/post/Category';
import TagView from '../views/post/Tag';
import CommentView from '../views/post/Comment';
import CommentSetupView from '../views/post/CommentSetup';
import UserView from '../views/user/User';
import SettingView from '../views/user/Setting';

import PropTypes from 'prop-types';

import RouteWithLayout from '../components/route/RouteWithLayout';
import MenuContext from "../context/MenuContext"

export default function Main() {
  const [onTab, setOnTab] = useState("");

  let saveTheme = localStorage.getItem("theme")

  if (saveTheme === null || saveTheme === 'undefined') {
    saveTheme = 'light';
  }

  const [theme, setTheme] = useState(saveTheme);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  }


  const handleOnTab = (tab) => {
    setOnTab(tab);
  };

  return (
    <MenuContext.Provider 
      value={
        {
          onTab: onTab, 
          handleOnTab: handleOnTab,
          theme: saveTheme,
          toggleTheme: toggleTheme
        }
      }>
      <Switch>
        <Route path="/" component={MainView}/>
        <Route path="/dashboard" component={DashboardView}/>
        <Route path="/post" component={PostView}/>
        <Route path="/category" component={CategoryView}/>
        <Route path="/comment" component={CommentView}/>
        <Route path="/commentsetup" component={CommentSetupView}/>
        <Route path="/tag" component={TagView}/>
        <Route path="/user" component={UserView}/>
        <Route path="/settings" component={SettingView}/>
      </Switch>
    </MenuContext.Provider>
  );
}

const Route = props => {
  const { path, component } = props;

  return (
    <RouteWithLayout
      component={component}
      exact
      layout={MainLayout}
      path={path}
    />
  )
}

Route.propTypes = {
  path: PropTypes.string.isRequired, 
  component: PropTypes.elementType.isRequired
};

