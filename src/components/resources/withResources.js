import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import deepFreeze from 'deep-freeze';

import {resourcesFromResourceLinks} from '../../core';

function WithResources(Component){
  function ResourcesComponent({
    resourceLinks,
    config,
    ...props
  }) {
    const [resources, setResources] = useState([]);

    useEffect(() => {
      resourcesFromResourceLinks({resourceLinks, config})
      .then(_resources => {
        setResources(deepFreeze(_resources));
      });
    }, [resourceLinks, config]);

    return (
      <Component resources={resources} {...props} />
    );
  }

  ResourcesComponent.propTypes = WithResources.propTypes;

  return ResourcesComponent;
}

WithResources.propTypes = {
  /** The link to parse and fetch the resource manifest */
  resourceLinks: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  /** The configuration of the server, and fetching */
  config: PropTypes.shape({
    server: PropTypes.string.isRequired,
    /** the overriding cache settings */
    cache: PropTypes.shape({
      /** cache age in ms */
      maxAge: PropTypes.number
    })
  }),
};

export default WithResources;
