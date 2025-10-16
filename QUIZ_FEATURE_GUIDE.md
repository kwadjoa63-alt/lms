# 🎓 Quiz Feature Guide

Complete guide to creating and managing quizzes in your LMS.

---

## ✨ Features

- ✅ **Multiple quizzes per chapter**
- ✅ **Multiple choice questions**
- ✅ **Custom passing scores**
- ✅ **Automatic grading**
- ✅ **Instant results with answer review**
- ✅ **Unlimited retakes**
- ✅ **Question explanations**
- ✅ **Points-based scoring**

---

## 👨‍🏫 For Teachers: Creating Quizzes

### Step 1: Navigate to Chapter Editor

1. Go to **Teacher Mode** → **Courses**
2. Select your course
3. Click on a chapter to edit

### Step 2: Create a Quiz

1. Scroll to **"Chapter Quizzes"** section
2. Click **"Add a quiz"**
3. Fill in:
   - **Title**: Quiz name (e.g., "Chapter 1 Assessment")
   - **Description**: Optional quiz description
   - **Passing Score**: Percentage needed to pass (default: 70%)
4. Click **"Create"**

### Step 3: Add Questions

1. Click **"Edit"** (pencil icon) on your quiz
2. Click **"Add question"**
3. Fill in:
   - **Question**: The question text
   - **Options**: Add 2+ answer choices
   - **Mark correct answer**: Click "Correct?" button on the right answer
   - **Points**: How many points this question is worth (default: 1)
   - **Explanation**: Optional explanation shown after answering
4. Click **"Add Question"**
5. Repeat for all questions

### Step 4: Publish the Quiz

1. Complete at least one question
2. Click **"Publish"** button in the top right
3. Quiz is now visible to students!

### Tips for Teachers

- **Multiple Quizzes**: Add multiple quizzes to test different concepts
- **Question Order**: Questions appear in the order you add them
- **Passing Score**: 
  - 70% = Good for most courses
  - 80-90% = Rigorous courses
  - 60% = More lenient
- **Points**: Use different point values for harder questions
- **Explanations**: Help students learn from mistakes

---

## 👨‍🎓 For Students: Taking Quizzes

### Step 1: Access the Quiz

1. Enroll in and purchase the course
2. Navigate to any chapter
3. Scroll down past the video and description
4. See available quizzes in the **"Chapter Quizzes"** section

### Step 2: Start the Quiz

1. Click **"Start Quiz"** on any available quiz
2. Review quiz details:
   - Number of questions
   - Passing score percentage
3. Begin answering questions

### Step 3: Answer Questions

1. Read each question carefully
2. Click on your chosen answer (radio button selection)
3. Selected answers are highlighted in blue
4. You can change answers before submitting

### Step 4: Submit and View Results

1. Click **"Submit Quiz"** when all questions are answered
2. View your results:
   - ✅ **Passed**: Green banner with score
   - ❌ **Failed**: Red banner with score
   - Score percentage and points earned
3. Review each question:
   - Correct answers marked in green ✓
   - Your incorrect answers shown in red
   - Explanations displayed (if teacher provided)

### Step 5: Retake (if needed)

1. Click **"Retake Quiz"** to try again
2. Or click **"Back to Chapter"** to continue

### Student Tips

- **No time limit**: Take your time answering
- **Review before submitting**: Double-check all answers
- **Learn from mistakes**: Read explanations on wrong answers
- **Retake anytime**: No limit on attempts
- **Track progress**: See which quizzes you've passed

---

## 🎯 Quiz Features

### For Teachers

**Quiz Management:**
- Create unlimited quizzes per chapter
- Edit quiz title, description, passing score
- Add/remove questions anytime
- Publish/unpublish control
- Delete quizzes

**Question Types:**
- Multiple choice (currently supported)
- Future: True/False, Short answer

**Customization:**
- Set custom passing scores (0-100%)
- Assign point values to questions
- Add explanations for learning
- Reorder questions by creation order

### For Students

**Quiz Taking:**
- Clean, distraction-free interface
- Radio button selection for answers
- Visual feedback on selection
- Submit button disabled until all answered

**Results:**
- Immediate grading
- Pass/Fail indicator
- Percentage score
- Points breakdown
- Answer review with explanations

**Features:**
- Unlimited retakes
- Progress tracking
- No time pressure
- Learn from mistakes

---

## 📊 Grading System

### How Scoring Works

1. **Points Per Question**: Each question has a point value (default: 1)
2. **Total Points**: Sum of all question points
3. **Earned Points**: Points from correct answers
4. **Percentage**: (Earned / Total) × 100
5. **Pass/Fail**: Percentage ≥ Passing Score

### Example

**Quiz Setup:**
- Question 1: 1 point
- Question 2: 2 points
- Question 3: 1 point
- Total: 4 points
- Passing Score: 75%

**Student Answers:**
- Question 1: ✓ Correct (1 point)
- Question 2: ✗ Wrong (0 points)
- Question 3: ✓ Correct (1 point)
- Earned: 2 points

**Result:**
- Score: 2/4 = 50%
- Status: ❌ Failed (needed 75%)

---

## 🔧 Technical Details

### Database Models

**Quiz:**
- Belongs to a Chapter
- Has many Questions
- Tracks passing score and publish status

**Question:**
- Belongs to a Quiz
- Has multiple Options
- Has point value and optional explanation

**QuestionOption:**
- Belongs to a Question
- Has text and isCorrect flag

**QuizAttempt:**
- Tracks student attempts
- Stores score and pass/fail status

**QuizAnswer:**
- Individual answer per question
- Links to attempt for history

### API Endpoints

```
POST   /api/courses/[courseId]/chapters/[chapterId]/quizzes
       Create new quiz

GET    /api/courses/[courseId]/chapters/[chapterId]/quizzes
       Get all quizzes for chapter

PATCH  /api/courses/[courseId]/chapters/[chapterId]/quizzes/[quizId]
       Update quiz

DELETE /api/courses/[courseId]/chapters/[chapterId]/quizzes/[quizId]
       Delete quiz

POST   /api/courses/[courseId]/chapters/[chapterId]/quizzes/[quizId]/questions
       Add question to quiz

POST   /api/courses/[courseId]/chapters/[chapterId]/quizzes/[quizId]/submit
       Submit quiz attempt
```

---

## 🚀 Getting Started

### Quick Start for Teachers

1. **Create a course** with chapters
2. **Edit any chapter**
3. **Scroll to "Chapter Quizzes"**
4. **Click "Add a quiz"**
5. **Fill in quiz details**
6. **Click on the quiz to add questions**
7. **Publish when ready**

### Quick Start for Students

1. **Enroll in a course**
2. **Go to any chapter**
3. **Scroll to quizzes section**
4. **Click "Start Quiz"**
5. **Answer all questions**
6. **Submit and view results**

---

## ❓ Troubleshooting

### Teacher Issues

**Quiz not showing in chapter:**
- Check if quiz is published
- Refresh the page
- Ensure chapter has the quiz

**Can't add questions:**
- Quiz must be created first
- Check quiz ID in URL
- Verify you own the course

**Students can't see quiz:**
- Quiz must be published
- Chapter must be published
- Student must have purchased course

### Student Issues

**Quiz not visible:**
- You must purchase the course first
- Quiz must be published by teacher
- Check if chapter has quizzes

**Can't submit:**
- Answer all questions first
- Check for unanswered questions (grayed out button)

**Score seems wrong:**
- Questions have different point values
- Check total points vs earned points
- Review answer explanation

---

## 🎨 UI Components

### Teacher View
- **Quiz List**: Shows all quizzes in chapter
- **Quiz Editor**: Edit quiz details and questions
- **Question Form**: Add/edit questions with options
- **Publish Controls**: Publish/unpublish quizzes

### Student View
- **Quiz Cards**: Shows available quizzes
- **Quiz Player**: Take quiz interface
- **Results Screen**: Score and answer review
- **Retake Option**: Try again button

---

## 📈 Future Enhancements

Potential additions:
- Time limits for quizzes
- Randomize question order
- Question banks
- True/False questions
- Fill-in-the-blank
- Essay questions with manual grading
- Quiz attempts limit
- Certificate on completion
- Leaderboards
- Quiz analytics for teachers

---

## 🔒 Security

- **Authorization**: Only course owners can create quizzes
- **Validation**: All inputs validated
- **Ownership**: Users can only submit to accessible quizzes
- **Data Privacy**: Answers linked to users securely

---

## 💡 Best Practices

### For Teachers

1. **Start Simple**: 3-5 questions per quiz is good
2. **Clear Questions**: Write unambiguous questions
3. **Good Distractors**: Make wrong answers plausible
4. **Use Explanations**: Help students learn
5. **Test Your Quiz**: Take it yourself first
6. **Balanced Difficulty**: Mix easy and hard questions
7. **Fair Passing Score**: 70% is standard

### For Students

1. **Read Carefully**: Don't rush through questions
2. **Review All Options**: Before selecting
3. **Use Retakes**: Learn from mistakes
4. **Read Explanations**: Understand why answers are correct
5. **Track Progress**: Complete all chapter quizzes

---

**Happy Teaching and Learning!** 🎉📚

