import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@apollo/client";
import { PhaseDisplay } from "./components";
import { getPhasesTasksQuery } from "./gql";
import { Phase } from "./interfaces";
import "./App.css";

const App = () => {
  const { loading, data, refetch } = useQuery(getPhasesTasksQuery);
  const [fact, setFact] = useState("");

  const allPhasesCompleted = data?.getPhasesTasks.every(
    (phase: Phase) => phase.allTasksCompleted
  );

  const fetchRandomFact = async () => {
    const { data } = await axios.get(
      "https://uselessfacts.jsph.pl/random.json?language=en"
    );
    setFact(data.text);
  };

  useEffect(() => {
    if (allPhasesCompleted) {
      fetchRandomFact();
    } else {
      setFact("");
    }
  }, [allPhasesCompleted]);

  return (
    <div className="App">
      {loading && <h1>Loading...</h1>}
      {!loading && data && (
        <>
          {fact && <p>{fact}</p>}
          <h1>My Startup Progress</h1>
          {data.getPhasesTasks.map((phase: Phase, index: number) => (
            <div key={phase.id}>
              <PhaseDisplay refetch={refetch} phase={phase} index={index} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default App;
