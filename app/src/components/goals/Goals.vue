<template>
  <section class="goals">
    <h2>My Goals</h2>
    <h3>Add a New Goal</h3>
    <AddGoal :onAdd="handleAdd"/>
    <h3>Current Goals</h3>
    <GoalList v-if="goals && goals.length > 0" :goals="goals"/>
    <p v-else>Add a goal to get started!</p>
  </section>
</template>

<script>
import api from '../../services/api';
import AddGoal from './AddGoal';
import GoalList from './GoalList';
export default {
  data() {
    return {
      goals: null
    };
  },
  components: {
    AddGoal,
    GoalList
  },
  created() {
    api.getGoals()
      .then(goals => {
        this.goals = goals;
      })
      .catch(err => {
        this.error = err;
      });
  },
  methods: {
    handleAdd(goal) {
      return api.addGoal(goal)
        .then(saved => {
          this.goals.push(saved);
        });
    }
  }
  
};
</script>

<style scoped>
.goals {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 70vh;
}
</style>