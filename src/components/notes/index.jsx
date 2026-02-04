import { Button, HStack, Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Notelist } from "./tasklist";
import axios from "axios";
import { API } from "../../helpers/constants";
import { useDispatch, useSelector } from "react-redux";
import { setNotes } from "../../stores/noteStore";

const INITIAL_VALUE = { notCompleted:[], isCompleted:[]}

export function Notes() {
    const dispatch = useDispatch()

    const userDetails = useSelector((store) => store.account.userDetails);

  const [task, setTask] = useState("");

  useEffect(() => {
    if(userDetails) {
        getTasks();
    }
    
  }, [userDetails]);

  function getTasks() {
    axios.post(`${API}/todo/list`, { uid: userDetails.uid }).then((res) => {
      console.log("resres", res.data);

      const init = { notCompleted: [], isCompleted: [] };
      const segregatedValue = res.data.reduce((acc, td) => {
        console.log("accacc", acc);

        if (td.completed) acc["isCompleted"].push(td);
        else acc["notCompleted"].push(td);
        return acc;
      }, init);
      console.log("resres", res.data, segregatedValue, INITIAL_VALUE);

      // debugger
      dispatch(setNotes(Object.assign(segregatedValue, {})))
      // debugger
    });
  }
  
  const addTask = () => {
    const newTask = { text: task, completed: false, uid: userDetails.uid };
    if (task.trim() !== "") {
      axios.post(`${API}/todo`, newTask).then((res) => {
        getTasks();
        setTask("");
      });
    }
  };

  return (
    <div>
      <HStack>
        <Input
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          focusBorderColor="teal.500"
        />
        <Button colorScheme="teal" onClick={addTask}>
          Add
        </Button>
      </HStack>
      <Notelist getTasks={getTasks}/>
    </div>
  );
}

