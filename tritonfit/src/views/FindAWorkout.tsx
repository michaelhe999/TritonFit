import { useEffect, useState } from "react";
import styles from "./FindAWorkout.module.css";
import dumbellIcon from "../assets/dumbellFindWorkoutPage.svg";
import { SingleWorkout } from "../components/WorkoutRelated/SingleWorkout";
import { SearchBar } from "../components/SearchBar";
import { Workout } from "../types/workout";
import { NavLink } from "react-router-dom";
import { getRecentWorkouts, getSavedWorkouts, deleteSavedWorkouts } from "utils/recentAndSavedWorkouts-util";

const fakeUserId: string = "000000000000000000000001";

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

  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [recentWorkouts, setRecentWorkouts] = useState<Workout[]>([]);
  const [filteredRecentExercises, setFilteredRecentExercises] =
    useState<Workout[]>(recentWorkouts);
  const [filteredSavedExercises, setFilteredSavedExercises] =
    useState<Workout[]>(savedWorkouts);

  useEffect(() => {
    loadRecentWorkouts();
    loadSavedWorkouts();
  }, [] );


  useEffect(() => {
    setFilteredRecentExercises(recentWorkouts);
  }, [recentWorkouts]);

  useEffect(() => {
    setFilteredSavedExercises(savedWorkouts);
  }, [savedWorkouts]);

  const loadRecentWorkouts = async () => {
    try {
      const updatedWorkouts = await getRecentWorkouts(fakeUserId);
      setRecentWorkouts(updatedWorkouts);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const loadSavedWorkouts = async () => {
    try {
      const updatedWorkouts = await getSavedWorkouts(fakeUserId);
      setSavedWorkouts(updatedWorkouts);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const clearSavedWorkouts = async () => {
    try {
      await deleteSavedWorkouts(fakeUserId);
      loadSavedWorkouts();
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const [recentWorkoutClicked, setRecentWorkoutClicked] =
    useState<boolean>(true);

  const handleRecentWorkoutClick = () => {
    setRecentWorkoutClicked(true);
    resetSearch();
  };

  const handleSavedWorkoutClick = () => {
    setRecentWorkoutClicked(false);
    resetSearch();
  };

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
                    id = {fakeUserId}
                  />
                ))}
              </div>
              <NavLink
                to="/createWorkout"
                style={{ textDecoration: 'none' }}
                data-testid="generateWorkoutButton"
                
              >
                <p className={styles.generateButton}>Generate new workout</p>
              </NavLink>
            </>
          )
        ) : savedWorkouts?.length === 0 ? (
          <>
            <NoWorkoutRender />
            <NavLink
                to="/createWorkout"
                style={{ textDecoration: 'none' }}
                data-testid="generateWorkoutButton"
                
              >
                <p className={styles.generateButton}>Generate new workout</p>
              </NavLink>
          </>
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
                  id = {fakeUserId}
                />
              ))}
            </div>
            <button onClick = {clearSavedWorkouts} className={styles.generateButton}>Clear saved workouts</button>
          </>
        )}
      </div>
    </div>
  );
};
