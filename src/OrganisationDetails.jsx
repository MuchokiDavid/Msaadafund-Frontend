import React from 'react'
import { useParams } from 'react-router-dom';

function OrganisationDetails() {
    const{ orgName } = useParams();

  return (
    <div>OrganisationDetails{orgName}</div>
  )
}

export default OrganisationDetails