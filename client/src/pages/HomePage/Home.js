import React from 'react';
import HomeSection from '../../components/HomeSection';
import EventSection from '../../components/EventSection';
import { homeObjOne, homeObjTwo, homeObjThree } from './Data';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Event } from '../EventPage/Event'
import ProjectSection from '../../components/ProjectSection';
import styled from 'styled-components';


function Home() {
  return (
    <>
        <HomeSection {...homeObjOne} />
        <EventSection {...homeObjThree} />
        <ProjectSection {...homeObjTwo} />       
    </>
  );
}

export default Home;