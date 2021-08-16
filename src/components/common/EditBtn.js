import React, { Component }  from 'react'
import { Link } from 'react-router-dom'


const EditBtn = ({ url }) => {

  return (
    <Link to={url} className="btn btn-primary">
        <svg><use xlinkHref="/storage/img/icons.svg#pen"></use></svg>
    </Link>       
    )
}

export default EditBtn