import React from 'react';
import EventBanner from '../../components/EventBanner';
import EventSection from '../../components/EventSection';
import NewsSection from '../../components/NewsSection'
import { eventBanner, eventRecent, newsRecent } from '../HomePage/Data';

function Event() {
  return (
    <>
      <EventBanner {...eventBanner} />
      <EventSection {...eventRecent} />
      <NewsSection {...newsRecent} />
    </>
  );
}

export default Event;