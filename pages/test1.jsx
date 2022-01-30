// import { useState, useEffect, createContext, useContext } from "react";
import * as React from "react";
import firebase from "../firebase/clientApp";
import { Button, Grid, Card, Text, Link, Input, Spacer } from "@nextui-org/react";
const { faker } = require("@faker-js/faker");
var db = firebase.firestore();

export default function Test1Page() {
  const [counter, setCounter] = React.useState(1234);
  const [data, setData] = React.useState();
  const [num, setNum] = React.useState(0);
  const [cards, setCards] = React.useState([]);
  const [values, setValues] = React.useState({
    refno: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
  });

  React.useEffect(() => {
    db.collection("_tests").onSnapshot((snapshot) => {
      setNum(snapshot.docs.length);
      setData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
        }))
      );
    });
    console.log({ setData });

  }, []);


  const fetchData = async () => {
    const data = await db
      .collection('_tests')
      .orderBy('time', 'asc')
      .limit(1)
      .get();
    setCards(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const demo = () => {
    setValues({
      refno: + new Date(),
      name: faker.name.findName(),
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      address: faker.address.streetAddress(), 
    });
  };


  const add = () => {
    /*
    {
        time: + new Date(),
        created: firebase.firestore.FieldValue.serverTimestamp(),
        name: faker.name.findName(),
        email: faker.internet.email()
      }
      */
    db.collection("_tests")
      .doc(+new Date() + "")
      .set(values)
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  const get = (documentId) => {
    db.collection("_tests").doc(documentId).get().then((snapshot) => {
      console.log(snapshot.data())
    }).catch((e) => console.log(e))
  }

  const deleteAll = (path) => {
    const ref = db.collection(path)
    ref.onSnapshot((snapshot) => {
      snapshot.docs.forEach((doc) => {
        ref.doc(doc.id).delete()
      })
    })
  }

  const handleClick = (e, id) => {
    console.log(id);
    console.log(+new Date());

    switch (id) {
      case "demo":
        demo();
        break;
      case "add":
        add();
        break;

      case "get":
        fetchData();
        // get('1643551773510');
        break;

      case "cancel":
        db.collection('_tests').doc("1643549902220").delete();
        break;

      case "deleteAll":
        deleteAll('_tests');
        break;

      default:
        //
        break;
    }
  };

  console.log(cards[0]);

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

      <Input label="Ref" value={values.refno} />
      <Spacer y={0.5} />
      <Input label="Name" value={values.name} />
      <Spacer y={0.5} />
      <Input label="Phone" value={values.phone} />
      <Spacer y={0.5} />
      <Input label="Email" value={values.email} />
      <Spacer y={0.5} />
      <Input label="Address" value={values.address} />
      <Spacer y={0.5} />


      <Grid.Container gap={3}>
        <Grid>
          <Button onClick={(e) => handleClick(e, "demo")}>Demo</Button>
        </Grid>
        <Grid>
          <Button color="secondary" onClick={(e) => handleClick(e, "add")}>
            Add
          </Button>
        </Grid>
        <Grid>
          <Button color="success" onClick={(e) => handleClick(e, "get")}>
            Get
          </Button>
        </Grid>
        <Grid>
          <Button color="warning" onClick={(e) => handleClick(e, "cancel")}>
            Cancel
          </Button>
        </Grid>
        <Grid>
          <Button color="error" onClick={(e) => handleClick(e, "deleteAll")}>
            Clear all
          </Button>
        </Grid>
        <Grid>
          <Button color="gradient" onClick={(e) => handleClick(e, "deleteAll")}>
            Reset
          </Button>
        </Grid>
      </Grid.Container>
      <table class="table table-bordered">
        <tr>
        <th>REFNO</th>
        <th>NAME</th>
          <th>PHONE</th>
          <th>EMAIL</th>
          <th>ADDRESS</th>

        </tr>

        {data?.map(({ id, data }) => (
          <tr key={id}>
          <td>{id}</td>
          <td>{data.name}</td>
          <td>{data.phone}</td>
          <td>{data.email}</td>
          <td>{data.address}</td>
          </tr>
        ))}
      </table>

      <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Surname</th>
      <th scope="col">Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Eugene</td>
      <td>Stepnov</td>
      <td>@e93</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Mark</td>
      <td>Dever</td>
      <td>@md111</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>John</td>
      <td>Piper</td>
      <td>@piper</td>
    </tr>
  </tbody>
</table>
    </div>
  );
}
