const generalData = {
  label: "General",
  fields: ["pace", "shooting", "passing", "dribbling", "defending", "physic"],
  labels: ["Pace", "Shooting", "Passing", "Dribbling", "Defending", "Physic"],
};

const attackingData = {
  label: "Attacking",
  fields: [
    "attacking_crossing",
    "attacking_finishing",
    "attacking_finishing",
    "attacking_heading_accuracy",
    "attacking_short_passing",
    "attacking_volleys",
  ],
  labels: ["Crossing", "Finishing", "Heading", "Short Passing", "Volleys"],
};

const skillData = {
  label: "Skill",
  fields: [
    "skill_dribbling",
    "skill_curve",
    "skill_fk_accuracy",
    "skill_long_passing",
    "skill_ball_control",
  ],
  labels: ["Dribbling", "Curve", "FK Accuracy", "Long Passing", "Ball Control"],
};

const movementData = {
  label: "Movement",
  fields: [
    "movement_acceleration",
    "movement_sprint_speed",
    "movement_agility",
    "movement_reactions",
    "movement_balance",
  ],
  labels: ["Acceleration", "Sprint", "Agility", "Reactions", "Balance"],
};

const powerData = {
  label: "Power",
  fields: [
    "power_shot_power",
    "power_jumping",
    "power_stamina",
    "power_strength",
    "power_long_shots",
  ],
  labels: ["Shot Power", "Jumping", "Stamina", "Strength", "Long Shots"],
};

const mentalityData = {
  label: "Mentality",
  fields: [
    "mentality_aggression",
    "mentality_interceptions",
    "mentality_positioning",
    "mentality_vision",
    "mentality_penalties",
  ],
  labels: ["Aggression", "Interceptions", "Positioning", "Vision", "Penalties"],
};
const defendingData = {
  label: "Defending",
  fields: [
    "defending",
    "defending_standing_tackle",
    "defending_sliding_tackle",
  ],
  labels: ["Marking", "Standing Tackle", "Sliding Tackle"],
};

const gkData = {
  label: "GoalKeeping",
  fields: [
    "goalkeeping_diving",
    "goalkeeping_handling",
    "goalkeeping_kicking",
    "goalkeeping_positioning",
    "goalkeeping_reflexes",
  ],
  labels: ["Diving", "Handling", "Kicking", "Positioning", "Reflexes"],
};

module.exports = {
  generalData: generalData,
  attackingData: attackingData,
  skillData: skillData,
  movementData: movementData,
  powerData: powerData,
  mentalityData: mentalityData,
  defendingData: defendingData,
  gkData: gkData,
};
