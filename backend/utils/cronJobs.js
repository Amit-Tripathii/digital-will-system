const cron = require("node-cron");
const User = require("../models/User");
const Nominee = require("../models/Nominee");
const sendEmail = require("./sendEmail");

const startCronJobs = () => {
  cron.schedule("0 0 * * *", async () => {
    console.log("Checking inactive users...");

    const users = await User.find();

    for (const user of users) {
      const daysInactive = Math.floor(
        (Date.now() - user.lastActive.getTime()) / (1000 * 60 * 60 * 24),
      );
      console.log(`${user.email} inactive for ${daysInactive} days`);

      // Warning after 30 days

      if (daysInactive >= 30 && daysInactive < 60) {
        await sendEmail(
          user.email,
          "Inactivity Warning",
          `You have been inactive for ${daysInactive} days. Please login to keep your account active.`,
        );
      }

      // Trigger Digital Will

      if (daysInactive >= 60 && !user.isTriggered) {
        const nominees = await Nominee.find({
          userId: user._id,
        });

        for (const nominee of nominees) {
          await sendEmail(
            nominee.nomineeEmail,
            "Digital Will Triggered",
            `
The account owner has been inactive for more than 60 days.

You have been registered as a nominee.

Please contact the administrator for verification.
`,
          );
        }

        user.isTriggered = true;

        await user.save();

        console.log(`Digital Will Triggered for ${user.email}`);
      }
    }
  });
};

module.exports = startCronJobs;
