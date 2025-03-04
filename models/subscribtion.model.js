import e from "express";
import mongoose from "mongoose";
const subscribtionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
      minlength: [2, "Name cannot be less than 2 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
      minlength: [0, "Price cannot be less than 2 characters"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "BDT"],
      default: "USD",
    },
    freequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      default: "monthly",
    },
    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "entertainment",
        "education",
        "technology",
        "other",
      ],
    },
    paymentMethod: {
      type: String,
      required: [true, "Please provide a payment method"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date must be a past date",
      },
    },
    renewlDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewl date must be greater than start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

subscribtionSchema.pre("save", function (next) {
  // calculate renewl date
  if (!this.renewlDate) {
    const renewalPeriod = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewlDate = new Date(this.startDate);
    this.renewlDate.setDate(
      this.renewlDate.getDate() + renewalPeriod[this.freequency]
    );
  }

  // auto update status
  if (this.renewlDate < new Date()) {
    this.status = "expired";
  }

  next();
});

const Subscribtion = mongoose.model("Subscribtion", subscribtionSchema);
export default Subscribtion;