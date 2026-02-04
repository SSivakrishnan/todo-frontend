import { Box, Button, Field, Input, Tabs } from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../helpers/utils";
import { FaGoogle, FaSignInAlt } from "react-icons/fa";

const { useReducer, useState } = require("react");

const SINGUP = "signup";
const LOGIN = "login";

export function SignUpSignIn() {
  const [data, setData] = useReducer(
    (state, action) => {
      console.log("useReducer", state, action);
      state[action.key] = action.value;
      return state;
    },
    {
      email: "",
      password: "",
    }
  );

  const [activeTab, setActiveTab] = useState(LOGIN);

  async function onSignUp() {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(auth.currentUser, {
        displayName: data.displayName
      });
    } catch (err) {
      console.log(err);
    }
  }

  function AuthGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(
          "AuthGoogle",
          result,
          token,
          user,
          getAdditionalUserInfo(result)
        );

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        console.error("Google auth error:", error);
        // ...
      });
  }

  async function onLogin() {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (err) {}
  }

  console.log("datadata", data);

  return (
    <Box maxW="md" mx="auto" mt={10} p={5} boxShadow="lg" borderRadius="lg">
      <Button colorScheme="teal" onClick={AuthGoogle} className="w-full">
        <FaGoogle /> Google
      </Button>
      <hr className="my-8" />

      <Tabs.Root
        defaultValue={activeTab}
        onValueChange={({ value }) => {
          setActiveTab(value);
          console.log("valuevalue", value);
        }}
        variant="enclosed"
        className="w-full"
      >
        <Tabs.List className="w-full mb-4">
          <Tabs.Trigger value={LOGIN} className="w-1/2">
            Login
          </Tabs.Trigger>
          <Tabs.Trigger value={SINGUP} className="w-1/2">
            Signup
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value={SINGUP}>
          <Field.Root>
            <Field.Label>Name</Field.Label>
            <Input
              type="name"
              onChange={(e) => {
                setData({
                  key: "displayName",
                  value: e.target.value,
                });
              }}
              placeholder="Enter your fullname"
              className="mb-4"
            />
          </Field.Root>
        </Tabs.Content>
      </Tabs.Root>
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input
          type="email"
          onChange={(e) => {
            setData({
              key: "email",
              value: e.target.value,
            });
          }}
          placeholder="Enter your email"
        />
      </Field.Root>
      <br />
      <Field.Root mb={3}>
        <Field.Label>Password</Field.Label>
        <Input
          type="password"
          onChange={(e) => {
            setData({
              key: "password",
              value: e.target.value,
            });
          }}
          placeholder="Enter your password"
        />
      </Field.Root>
      {activeTab === LOGIN ? (
        <Button colorScheme="teal" onClick={onLogin} className="mt-2">
          <FaSignInAlt /> Login
        </Button>
      ) : (
        <Button colorScheme="teal" onClick={onSignUp} className="mt-2">
          <FaSignInAlt /> SignUp
        </Button>
      )}
    </Box>
  );
}
