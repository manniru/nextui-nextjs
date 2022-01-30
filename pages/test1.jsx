// import { useState, useEffect, createContext, useContext } from "react";
import * as React from "react";
import firebase from "../firebase/clientApp";
import { Button, Grid, Card, Text, Link } from "@nextui-org/react";
const { faker } = require("@faker-js/faker");
var db = firebase.firestore();

export default function Test1Page() {
  const [counter, setCounter] = React.useState(1234);
  const [data, setData] = React.useState();
  const [num, setNum] = React.useState(0);

  React.useEffect(() => {
    db.collection("_tests").onSnapshot((snapshot) => {
      setNum(snapshot.docs.length - 1);
      setData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
        }))
      );
    });
    console.log({ setData });
  }, []);

  const demo = () => {
    var data;
  };

  const add = () => {
    db.collection("_tests")
      .doc(+new Date() + "")
      .set({
        name: faker.name.findName(),
        email: faker.internet.email()
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  const handleClick = (e, id) => {
    console.log(id);
    console.log(+new Date());

    switch (id) {
      case "submit":
        add();
        break;
      case "cancel":
        db.collection('_tests').doc("1643549902220").delete();
        break;

      default:
        //
        break;
    }
  };

  return (
    <div>
      <h1>Brilliant</h1>

      <Grid.Container gap={3}>
        <Grid>
          <Card css={{ w: "330px" }} color="error">
            <Text h4 color="white" style={{ textAlign: "center" }}>
              InfoBox1
            </Text>
            <Text color="white" style={{ textAlign: "center" }}>
              <h1>{num}</h1>
            </Text>
            <Card.Footer>
              <Link
                color="white"
                target="_blank"
                href="https://github.com/nextui-org/nextui"
              >
                Visit source code on GitHub.
              </Link>
            </Card.Footer>
          </Card>
        </Grid>
        <Grid>
          <Card css={{ w: "330px" }} color="secondary">
            <Text h4 color="white" style={{ textAlign: "center" }}>
              InfoBox2
            </Text>
            <Text color="white" style={{ textAlign: "center" }}>
              <h1>{counter}</h1>
            </Text>{" "}
            <Card.Footer>
              <Link
                color="white"
                target="_blank"
                href="https://github.com/nextui-org/nextui"
              >
                Visit source code on GitHub.
              </Link>
            </Card.Footer>
          </Card>
        </Grid>
        <Grid>
          <Card css={{ w: "330px" }} color="success">
            <Text h4 color="white" style={{ textAlign: "center" }}>
              InfoBox3
            </Text>
            <Text color="white" style={{ textAlign: "center" }}>
              <h1>{counter}</h1>
            </Text>
            <Card.Footer>
              <Link
                color="white"
                target="_blank"
                href="https://github.com/nextui-org/nextui"
              >
                Visit source code on GitHub.
              </Link>
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>

      <Grid.Container gap={3}>
        <Grid>
          <Button onClick={(e) => handleClick(e, "demo")}>Demo</Button>
        </Grid>
        <Grid>
          <Button color="secondary" onClick={(e) => handleClick(e, "submit")}>
            Submit
          </Button>
        </Grid>
        <Grid>
          <Button color="success" onClick={(e) => handleClick(e, "cancel")}>
            Cancel
          </Button>
        </Grid>
        <Grid>
          <Button color="error" onClick={(e) => handleClick(e, "clearall")}>
            Clear all
          </Button>
        </Grid>
      </Grid.Container>
      <table border="1">
        <tr>
          <th>NAME</th>
          <th>PASSWORD</th>
        </tr>

        {data?.map(({ id, data }) => (
          <tr key={id}>
            <td>{data.name}</td>
            <td>{data.email}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
