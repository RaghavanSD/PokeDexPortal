import React from 'react';
import { Form, Container, Col } from 'react-bootstrap';


 const Search=(props)=> {
  const{findPokemon,onChangeSortBy}=props;

  
  return (
    <Container className="container-fluid">
      <Form className="mt-2" onSubmit={(e)=>e.preventDefault()}>
        <Form.Row className="d-flex align-items-center justify-content-center" >
          <Col sm={10} className="my-1">
            <Form.Control
              onChange={(e) => findPokemon(e.target.value.toLocaleLowerCase())}
              placeholder="Search for Pokemon name or ability" />
          </Col>
          <select onChange={onChangeSortBy} className="form-select" placeholder={"SortBy"} aria-label="Default select example">
                <option selected>SortBy</option>
                <option value="1">Name</option>
                <option value="2">Height</option>
                <option value="3">Weight</option>
              </select>
        </Form.Row>
      </Form>
    </Container>
  )
}

export default Search;