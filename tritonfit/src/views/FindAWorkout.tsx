import { useState } from "react";
import styles from "./FindAWorkout.module.css";
import dumbellIcon from "../assets/dumbellFindWorkoutPage.svg";
import { SingleWorkout } from "../components/SingleWorkout";
import { SearchBar } from "../components/SearchBar";
import { Workout, Difficulty } from "../types/workout";
import { Exercise } from "../types/exercise";
import { NavLink } from "react-router-dom";

// Exercises and workouts are hard coded until database is integrated; remove once database integrated
const fakeExercise: Exercise[] = [
  {
    name: "Pushup",
    sets: 3,
    reps: "4-6",
  },
];

const fakeWorkout: Workout[] = [
  {
    workoutName: "Back Builder",
    workoutDescription: "HIIT for back",
    workoutDuration: 30,
    workoutDifficulty: Difficulty.INTERMEDIATE,
    exercises: fakeExercise,
  },
  {
    workoutName: "Chest Strength",
    workoutDescription: "HIIT for chest",
    workoutDuration: 60,
    workoutDifficulty: Difficulty.ADVANCED,
    exercises: fakeExercise,
  },
  {
    workoutName: "Full Body",
    workoutDescription: "HIIT for full body",
    workoutDuration: 45,
    workoutDifficulty: Difficulty.BEGINNER,
    exercises: fakeExercise,
  },
];

const NoWorkoutRender = () => {
  return (
    <>
      <h1 className={styles.noWorkoutHeader}>No workouts yet</h1>
      <p className={styles.noWorkoutText}>
        You don’t have any workouts yet. Generate a new workout now!
      </p>
      <img className={styles.dumbellIcon} src={dumbellIcon} alt="dumbellIcon" />
    </>
  );
};

export const FindAWorkout = () => {
  const [recentWorkoutClicked, setRecentWorkoutClicked] =
    useState<boolean>(true);

  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>(fakeWorkout);
  const [recentWorkouts, setRecentWorkouts] = useState<Workout[]>(fakeWorkout);

  const handleRecentWorkoutClick = () => {
    setRecentWorkoutClicked(true);
    resetSearch();
  };

  const handleSavedWorkoutClick = () => {
    setRecentWorkoutClicked(false);
    resetSearch();
  };

  const [filteredRecentExercises, setFilteredRecentExercises] =
    useState<Workout[]>(recentWorkouts);
  const [filteredSavedExercises, setFilteredSavedExercises] =
    useState<Workout[]>(savedWorkouts);

  const handleRecentSearchResults = (results: Workout[]) => {
    setFilteredRecentExercises(results);
  };

  const handleSavedSearchResults = (results: Workout[]) => {
    setFilteredSavedExercises(results);
  };

  const resetSearch = () => {
    setFilteredRecentExercises(recentWorkouts);
    setFilteredSavedExercises(savedWorkouts);
  };

  return (
    <div className="container">
      <h1 className={styles.header}>Find A Workout</h1>
      <div className={styles.buttonRow}>
        <button
          data-testid="recentWorkoutButton"
          className={
            recentWorkoutClicked
              ? styles.buttonClicked
              : styles.buttonNotClicked
          }
          onClick={handleRecentWorkoutClick}
        >
          Recent Workouts
        </button>

        <button
          data-testid="savedWorkoutButton"
          className={
            !recentWorkoutClicked
              ? styles.buttonClicked
              : styles.buttonNotClicked
          }
          onClick={handleSavedWorkoutClick}
        >
          Saved Workouts
        </button>
      </div>

      <div>
        {recentWorkoutClicked ? (
          recentWorkouts?.length === 0 ? (
            <NoWorkoutRender />
          ) : (
            <>
              <SearchBar
                items={recentWorkouts}
                onResults={handleRecentSearchResults}
                searchKey="workoutName"
                resetCondition={setRecentWorkoutClicked}
              />
              <div>
                {filteredRecentExercises.map((currWorkout) => (
                  <SingleWorkout
                    workout={currWorkout}
                    exercises={currWorkout.exercises}
                  />
                ))}
              </div>
            </>
          )
        ) : savedWorkouts?.length === 0 ? (
          <NoWorkoutRender />
        ) : (
          <>
            <SearchBar
              items={savedWorkouts}
              onResults={handleSavedSearchResults}
              searchKey="workoutName"
              resetCondition={setRecentWorkoutClicked}
            />
            <div>
              {filteredSavedExercises.map((currWorkout) => (
                <SingleWorkout
                  workout={currWorkout}
                  exercises={currWorkout.exercises}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <NavLink
        to="/createWorkout"
        data-testid="generateWorkoutButton"
        className={styles.generateButton}
      >
        <p>Generate new workout</p>
      </NavLink>
    </div>
  );
};
