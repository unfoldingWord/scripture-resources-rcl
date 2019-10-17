import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import deepFreeze from 'deep-freeze';

import {resourceFromResourceLink} from '../../core';

function WithResource(Component){
  function ResourceComponent({
    resourceLink,
    config,
    ...props
  }) {
    const [resource, setResource] = useState();

    useEffect(() => {
      resourceFromResourceLink({resourceLink, config})
      .then(_resource => {
        setResource(deepFreeze(_resource));
      });
    }, [resourceLink, config]);

    return (
      <Component resource={resource} {...props} />
    );
  }

  ResourceComponent.propTypes = WithResource.propTypes;

  return ResourceComponent;
}

WithResource.propTypes = {
  /** The link to parse and fetch the resource manifest */
  resourceLink: PropTypes.string.isRequired,
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

export default WithResource;
