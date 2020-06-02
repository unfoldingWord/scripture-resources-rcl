import React, { useContext } from 'react'
import PropTypes, { func } from 'prop-types';

import { useResource } from '..';

export const ResourceContext = React.createContext({})

export function ResourceContextProvider({
    resource,
    resourceLink,
    reference,
    config,
    onResource,
    children,
}) {

    const val = useResource({
        resource: resource,
        resourceLink: resourceLink,
        reference: reference,
        config: config,
        onResource: onResource,
    });
  
    return (
      <ResourceContext.Provider value={val}>
        {children}
      </ResourceContext.Provider>
    );
};
  
ResourceContextProvider.propTypes = {
    /** the resource content */
    resource: PropTypes.object,
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
    /** action taken after a resource is acquired */
    onResource: PropTypes.func.isRequired,
};
  
  export default ResourceContextProvider;
