import { Field } from "@ark-ui/react";
import { Button, CloseButton, Drawer, Input, Portal } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, updateUser } from "../stores/accountStore";
import { SignUpSignIn } from "./signup-signin";
import { Image } from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../helpers/utils";

export function Sidebar() {
  const userDetails = useSelector((store) => store.account.userDetails);

  console.log("userDetails", userDetails);

  return (
    <Portal>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>Edit Sidebar Details </Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
            {userDetails ? <UserDisplay /> : <SignUpSignIn />}

            {userDetails && <SingOut />}
          </Drawer.Body>

          <Drawer.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Drawer.CloseTrigger>
        </Drawer.Content>
      </Drawer.Positioner>
    </Portal>
  );
}

export default Sidebar;

function UserDisplay() {
  const dispatch = useDispatch();

  const userDetails = useSelector((store) => store.account.userDetails);

  const { displayName, email, photoURL } = userDetails;

  console.log("photoURL", photoURL);

  return (
    <Fragment>
      {photoURL && (
        <div className="mb-4">
          <Image
            src={photoURL}
            boxSize="50px"
            borderRadius="full"
            fit="cover"
            alt="Naruto Uzumaki"
          />
        </div>
      )}

      <Field.Root mb={3}>
        <Field.Label>Name</Field.Label>
        <Input
          value={displayName}
          onChange={(e) =>
            dispatch(updateUser({ key: "displayName", value: e.target.value }))
          }
          readOnly={true}
          placeholder="Name"
        />
      </Field.Root>
      <br />
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input
          value={email}
          onChange={(e) =>
            dispatch(updateUser({ key: "email", value: e.target.value }))
          }
          readOnly={true}
          placeholder="Email"
        />
      </Field.Root>
    </Fragment>
  );
}

function SingOut() {
  const dispatch = useDispatch();

  function onSignOut(){
    signOut(auth).then(() => {
      dispatch(setUser(null))
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    
  }

  return (
    <Button className="mt-8" colorScheme="teal" onClick={onSignOut}>
      <FaSignOutAlt /> Signout
    </Button>
  );
}
