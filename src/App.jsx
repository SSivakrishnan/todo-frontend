import { useEffect } from "react";
import { Box, Button, HStack, Text, Drawer } from "@chakra-ui/react";

import Sidebar from "./components/sidebar.jsx";
import { useDispatch, useSelector } from "react-redux";

import "./firebase.js";
import { auth } from "./helpers/utils.js";
import { onAuthStateChanged } from "firebase/auth";
import { Notes } from "./components/notes/index.jsx";
import { setUser } from "./stores/accountStore.js";
import { setNotes } from "./stores/noteStore.js";

function App() {
  const dispatch = useDispatch();

  const userDetails = useSelector((store) => store.account.userDetails);

  useEffect(() => {
    console.log("useEffect");
    onAuthStateChanged(auth, (user) => {
      console.log("useruser", user);

      if (user) {
        const { displayName, email, photoURL, uid } = user;
        dispatch(setUser({ displayName, email, photoURL, uid }));
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // const uid = user.uid;
        // ...
      } else {
        dispatch(setNotes({}));

        // User is signed out
        // ...
      }
    });
  }, [dispatch]);

  return (
    <Box maxW="md" mx="auto" mt={10} p={5} boxShadow="lg" borderRadius="lg">
      <HStack justifyContent="space-between" mb={4}>
        <Drawer.Trigger asChild>
          <Button variant="outline" size="sm">
            Open Drawer
          </Button>
        </Drawer.Trigger>
        <Text fontSize="sm">Welcome, {userDetails?.name}</Text>
      </HStack>
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={4}>
        ✅ To-Do List
      </Text>

      
      <Notes />

      <Sidebar />
    </Box>
  );
}

export default App;
