# Gains & Grains Full Stack Food/Fitness App

SEBPT 220 Project 2: Gains & Grains.

To view, please visit: (will update when deployed)

## How to Install

Fork and clone this repository to your local machine.

Run the following command in your terminal after navigating to this repo: npm run dev

Open localhost:3000 in your browser, and the repo in VSCode to edit.

*This will not actually work due to the .gitignore files*

## User Stories

User would like to:

- Sign up and create a profile so they can use the app/site.
- Log in and out of their account so they can access their personal dashboard and keep it secure.
- Log workouts so they can keep track of their fitness activities and see progress over time.
- Edit or delete a workout entry so they can correct any mistakes or remove something.
- Log daily food intake so they can track their calorie consumption.
- Edit or delete a food log entry so they can correct any mistakes or remove something.
- Set and track fitness goals.

## Wireframe

![first draft](./readMeImg/p2wireframe1.png)

## ERD

### User

```ruby
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        username: {
            type: String,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^[a-zA-Z0-9-_]+$/.test(v);
                },
                message: (props) =>
                    `${props.value} is not a valid username! Only letters, numbers, dashes, and underscores are allowed.`,
            },
            required: [true, "Username is required"],
        },
        email: {
            type: String,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: (props) => `${props.value} is not a valid email address!`,
            },
            required: [true, "Email address is required"],
        },
        password: { type: String, required: true },
        phoneNumber: {
            type: String,
            validate: {
                validator: function (v) {
                    return /\d{3}-\d{3}-\d{4}/.test(v);
                },
                message: (props) => `${props.value} is not a valid phone number!`,
            },
            required: [true, "Your phone number is required"],
        },
        birthDate: { type: Date },
        age: { type: Number, min: 0 },
        weight: { type: Number },
        height: {
            feet: { type: Number },
            inches: { type: Number }
        }
    },
    { timestamps: true }
);
```

### Workout

```ruby
const workoutSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        date: { type: Date, required: true },
        exercises: [
            {
                name: { type: String, required: true },
                sets: { type: Number },
                reps: { type: Number },
                weight: { type: Number },
                duration: { type: Number },
            },
        ],
    },
    { timestamps: true }
);
```

### Goal

```ruby
const goalSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        description: { type: String },
        targetDate: { type: Date, required: true },
        achieved: { type: Boolean, default: false }
    },
    { timestamps: true }
);
```

### FoodLog

```ruby
const foodSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        meals: [
            {
                name: { type: String, required: true },
                calories: { type: Number },
                protein: { type: Number },
                carbs: { type: Number },
                fats: { type: Number },
                dateConsumed: { type: Date, required: true }
            },
        ],
    },
    { timestamps: true }
);
```

### Contact/Message

```ruby
const contactSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, "Name is required"] },
        email: {
            type: String,
            required: [true, "Email address is required"],
        },
        message: { type: String, required: [true, "Message is required"] },
        dateSubmitted: { type: Date, default: Date.now },
    },
    { timestamps: true }
);
```

## How It Works

When a user visit's the page, they can navigate through the homepage and access the available pages via the navigation bar.

If the user decides to sign up, they can create an account and then login using their usename and password from the login page.

The user can now access the app's full list of features and can select what they'd like to do via the dashboard.

If the user would like to add more information to their account they can access the profile page and update what they wish as not all information is required during account creation.

Happy logging!

## Future Considerations

If I do come back to this in the future I'd like to set up an API call that will search workouts/exercises and be able to input values such as "Targeted Muscle" or "Muscle Group", kind of how like the food API will autofill nutritional info. I'd also like it to display a photo of the workout and or a video/text that explains it.

I would also like to expand the home page with more information and photos, not entirely sure what of though, but something to make it have a little more substence I guess.

Another thing is that I'd like to get proper error/success pop ups working, did not end up getting to that and just used flash messages and I don't think it looks that good.

I'd also like to add in some functions that will add additional meals and exercises when making them. Currently there is a button there but it does not actually do anything. Ideally it would just create another set of inputs for the next food item/exercise and then they all save together. 

Finally, I was hoping on implementing a better "Goal Tracking" feature where it would include some sort of progress bar and track things automatically. For example, if your goal was to workout 5 times in one week it would track the number of workout logs made in that week and automatically complete the goal when the target is hit. 

## Known Issues
Goal does not save when the achieved box is checked when editing the goal.

"Add Meal" and "Add Exercise" buttons on their respective new and edit pages do not work as there was not a function made for the button to run.

On the Dashboard page, the " 'S DASHBOARD " text does not respond as intended when the window height is under about 650 pixels, it gets covered by the cards.

Carousel nav displays when the overlay nav menu is open during smaller view widths. Not the worst thing ever but shouldn't be there.

API nutritional information is based off of 100g serving. Currently no way to implement a serving size to account for that.
