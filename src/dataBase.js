import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize("sadran", "root", "208730326", {
  host: "localhost",
  dialect: "mysql",
  logging: console.log("the connection to the DB succeded!"),
});

export const Users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    identityNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    freezeTableName: true,
    timestamps: false,
  }
);

export const SolidersInfo = sequelize.define(
  "solidersInfo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    armyNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [7, 7],
      },
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    quality: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        qualityCondition(val) {
          if (val !== "יתר" || "ליבה" || "ק. נמך" || "בינוני" || "נמוך") {
            throw new Error("הנתונים שהוזנו בעמודה: איכות שגויים");
          }
        },
      },
    },
    qualityGroup: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        qualityGroupCondition(val) {
          if (41 >= val >= 56) {
            throw new Error("הנתונים שהוזנו בעמודה: קב''א שגויים");
          }
        },
      },
    },
    initialPsychotechnicGrading: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        qualityGroupCondition(val) {
          if (
            val !== 10 ||
            val !== 20 ||
            val !== 30 ||
            val !== 40 ||
            val !== 50 ||
            val !== 60 ||
            val !== 70 ||
            val !== 80 ||
            val !== 90
          ) {
            throw new Error("הנתונים שהוזנו בעמודה: דפ''ר שגויים");
          }
        },
      },
    },
    officerCoordinator: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        officerCoordinatorCondition(val) {
          if (0 > val > 2) {
            throw new Error("הנתונים שהוזנו בעמודה: מתאם שגויים");
          }
        },
      },
    },
    hebrewLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        officerCoordinatorCondition(val) {
          if (5 > val > 8) {
            throw new Error("הנתונים שהוזנו בעמודה: סימול עברית שגויים");
          }
        },
      },
    },
    welfareStage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        officerCoordinatorCondition(val) {
          if (1 > val > 5) {
            throw new Error("הנתונים שהוזנו בעמודה: ציון ת''ש שגויים");
          }
        },
      },
    },
    SocioEconomicIndex: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        officerCoordinatorCondition(val) {
          if (1 > val > 10) {
            throw new Error("הנתונים שהוזנו בעמודה: מדד סוציו-אקונומי שגויים");
          }
        },
      },
    },
    MilitaryServiceRemainingTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        officerCoordinatorCondition(val) {
          if (0 > val > 32) {
            throw new Error("הנתונים שהוזנו בעמודה: ית''ש שגויים");
          }
        },
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export const AdditionalCriteria = sequelize.define(
  "additionalCriteria",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    notCounted: {
      type: DataTypes.INTEGER,
      validate: {
        len: [7, 7],
      },
    },
    militarySchool: {
      type: DataTypes.INTEGER,
      validate: {
        len: [7, 7],
      },
    },
    newImmigrant: {
      type: DataTypes.INTEGER,
      validate: {
        len: [7, 7],
      },
    },
    lonely: {
      type: DataTypes.INTEGER,
      validate: {
        len: [7, 7],
      },
    },
    onlyChild: {
      type: DataTypes.INTEGER,
      validate: {
        len: [7, 7],
      },
    },
    adjustmentProblems: {
      type: DataTypes.INTEGER,
      validate: {
        len: [7, 7],
      },
    },
    ethiopian: {
      type: DataTypes.INTEGER,
      validate: {
        len: [7, 7],
      },
    },
    excessWeight: {
      type: DataTypes.INTEGER,
      validate: {
        len: [7, 7],
      },
    },
    militaryPrepSchool: {
      type: DataTypes.INTEGER,
      validate: {
        len: [7, 7],
      },
    },
    bonding: {
      type: DataTypes.INTEGER,
      validate: {
        len: [7, 7],
      },
    },
    rabbinicAcademy: {
      type: DataTypes.INTEGER,
      validate: {
        len: [7, 7],
      },
    },
    druse: {
      type: DataTypes.INTEGER,
      validate: {
        len: [7, 7],
      },
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

sequelize
  .sync({ alter: true })
  .then((data) => {
    console.log("table and module are synced successfully!");
  })
  .catch((err) => {
    console.log("Error syncing the table and module!");
  });

export const connect = async function () {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
