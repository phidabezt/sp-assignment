import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import { NavBar } from "../index"
import classes from "../NavBar.module.scss"

describe("<NavBar />", () => { 
  it("should render the component", () => { 
    const { getByText, getByAltText } = render(<NavBar />)
    expect(getByAltText('menu icon')).toBeInTheDocument()
    expect(getByAltText('notification icon')).toBeInTheDocument()
    expect(getByText('MyENV')).toBeInTheDocument()
    expect(getByText('Current Location')).toBeInTheDocument()
  })
})