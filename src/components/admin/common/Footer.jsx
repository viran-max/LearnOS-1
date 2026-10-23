import React from 'react'

const Footer = () => {

  const year = new Date().getFullYear();

  return (
    <>
    <div className="container-fluid bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <p className="mb-0">
          © {year} LearnOS Admin Panel. All Rights Reserved.
        </p>
      </div>
    </div>
    </>
  )
}

export default Footer