import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  Spinner,
  Button,
} from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { fetchPokemon } from "../../services/pokemon.js";
export default function PokemonData(props) {
  const { name } = useParams();
  const spinnerWrapperStyle = {
    textAlign: "center",
    marginTop: "50px",
  };

  const spinnerStyle = {
    width: "10rem",
    height: "10rem",
    borderWidth: "1rem",
  };

  const history = useHistory();
  const [pokemon, setPokemon] = React.useState();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (name) {
      setTimeout(async () => {
        try {
          const response = await fetchPokemon(name);
          const results = await response.json();
          console.log(results);
          setPokemon(results);
          setLoading(false);
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      }, 1500);
    }
  }, [name]);

  return (
    <Container className="mt-2">
      <Button onClick={() => history.goBack()} style={{ width: "10%" }}>
        {"<-Back"}
      </Button>
      {loading || !pokemon ? (
        <div style={spinnerWrapperStyle}>
          <Spinner style={spinnerStyle} animation="border" />
        </div>
      ) : (
        !!pokemon && (
          <Row>
            <Col xs={12} md={6}>
              <Card>
                <Card.Header>
                  <h5>{pokemon.name}</h5>
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                </Card.Header>
                <Card.Body>
                  <h5>Abilities</h5>
                  {pokemon.abilities.map((ability, key) => (
                    <div key={key}>
                      <span>{ability.ability.name}</span>
                    </div>
                  ))}
                  <h5>Types</h5>
                  {pokemon.types.map((type, key) => (
                    <div key={key}>
                      <span>{type.type.name}</span>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6}>
              <Card>
                <Card.Body>
                  <h4>Base Stats</h4>
                  {pokemon.stats.map((stat, key) => (
                    <div key={key}>
                      <strong>{stat.stat.name}</strong>
                      <ProgressBar
                        now={stat.base_stat}
                        max={255}
                        label={stat.base_stat}
                      />
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )
      )}
    </Container>
  );
}
