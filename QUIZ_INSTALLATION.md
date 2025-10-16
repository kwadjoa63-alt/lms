# Quiz Feature Installation

## 🚀 Quick Setup

The quiz feature has been installed! Follow these steps to activate it:

### 1. Restart TypeScript Server (VS Code)

Press `Ctrl+Shift+P` and type:
```
TypeScript: Restart TS Server
```

### 2. Restart Dev Server

```bash
# Stop the server (Ctrl+C if running)
npm run dev
```

That's it! The quiz feature is now active.

---

## ✅ What's Been Added

### Database Models
- ✅ Quiz
- ✅ Question
- ✅ QuestionOption
- ✅ QuizAttempt
- ✅ QuizAnswer

### API Routes
- ✅ Create/update/delete quizzes
- ✅ Add questions to quizzes
- ✅ Submit quiz attempts
- ✅ Auto-grading system

### Teacher UI
- ✅ Quiz management in chapter editor
- ✅ Question creation with options
- ✅ Publish/unpublish controls
- ✅ Visual question preview

### Student UI
- ✅ Quiz player interface
- ✅ Answer selection
- ✅ Results screen
- ✅ Answer review with explanations
- ✅ Retake functionality

---

## 🎯 How to Use

### For Teachers

1. **Go to any chapter** in Teacher Mode
2. **Scroll to "Chapter Quizzes"** section
3. **Click "Add a quiz"**
4. **Fill in quiz details** and create
5. **Click "Edit"** on the quiz to add questions
6. **Add questions** with multiple choice options
7. **Mark the correct answer** for each question
8. **Publish** when ready!

### For Students

1. **Enroll in a course**
2. **Go to any chapter**
3. **Scroll to "Chapter Quizzes"**
4. **Click "Start Quiz"**
5. **Answer all questions**
6. **Submit and view results**
7. **Retake if needed**

---

## 📋 Files Created

### Database
- `prisma/schema.prisma` - Updated with quiz models

### API Routes
- `app/api/courses/[courseId]/chapters/[chapterId]/quizzes/route.ts`
- `app/api/courses/[courseId]/chapters/[chapterId]/quizzes/[quizId]/route.ts`
- `app/api/courses/[courseId]/chapters/[chapterId]/quizzes/[quizId]/questions/route.ts`
- `app/api/courses/[courseId]/chapters/[chapterId]/quizzes/[quizId]/submit/route.ts`

### Teacher Components
- `app/(dashboard)/(routes)/teacher/courses/[courseId]/chapters/[chapterId]/_components/quiz-form.tsx`
- `app/(dashboard)/(routes)/teacher/courses/[courseId]/chapters/[chapterId]/quizzes/[quizId]/page.tsx`
- `app/(dashboard)/(routes)/teacher/courses/[courseId]/chapters/[chapterId]/quizzes/[quizId]/_components/quiz-title-form.tsx`
- `app/(dashboard)/(routes)/teacher/courses/[courseId]/chapters/[chapterId]/quizzes/[quizId]/_components/quiz-description-form.tsx`
- `app/(dashboard)/(routes)/teacher/courses/[courseId]/chapters/[chapterId]/quizzes/[quizId]/_components/quiz-passing-score-form.tsx`
- `app/(dashboard)/(routes)/teacher/courses/[courseId]/chapters/[chapterId]/quizzes/[quizId]/_components/questions-form.tsx`
- `app/(dashboard)/(routes)/teacher/courses/[courseId]/chapters/[chapterId]/quizzes/[quizId]/_components/quiz-actions.tsx`

### Student Components
- `app/(course)/courses/[courseId]/chapters/[chapterId]/_components/quiz-player.tsx`

---

## 🎨 UI Preview

### Teacher - Quiz Creation
```
┌─────────────────────────────────────┐
│ Chapter Quizzes        [Add a quiz] │
├─────────────────────────────────────┤
│ 📝 Chapter 1 Quiz                   │
│ 5 questions • 70% to pass  [Edit] [X]│
├─────────────────────────────────────┤
│ 📝 Final Assessment                 │
│ 10 questions • 80% to pass [Edit] [X]│
└─────────────────────────────────────┘
```

### Student - Quiz Taking
```
┌─────────────────────────────────────┐
│ 1. What is React?                   │
├─────────────────────────────────────┤
│ ○ A programming language            │
│ ● A JavaScript library         ✓    │
│ ○ A database                        │
│ ○ An operating system               │
└─────────────────────────────────────┘
```

### Results Screen
```
┌─────────────────────────────────────┐
│         ✓ Congratulations!          │
│         Score: 85%                  │
│         4 / 5 points               │
├─────────────────────────────────────┤
│  ✓ Question 1 - Correct            │
│  ✓ Question 2 - Correct            │
│  ✗ Question 3 - Review Answer      │
│  ✓ Question 4 - Correct            │
│  ✓ Question 5 - Correct            │
├─────────────────────────────────────┤
│ [Retake Quiz] [Back to Chapter]    │
└─────────────────────────────────────┘
```

---

## 🔍 Troubleshooting

### "Property 'quiz' does not exist"

**Solution:**
```bash
# Restart TypeScript server in VS Code
Ctrl+Shift+P → "TypeScript: Restart TS Server"

# Or restart dev server
npm run dev
```

### Quiz not showing for students

**Checklist:**
- [ ] Quiz is published
- [ ] Chapter is published
- [ ] Student has purchased course
- [ ] Page has been refreshed

### Can't add questions

**Checklist:**
- [ ] Quiz has been created
- [ ] You're on the quiz edit page
- [ ] At least 2 options provided
- [ ] One option marked as correct

---

## 💡 Example Quiz Flow

### Teacher Creates Quiz

1. Edit "Introduction to JavaScript" chapter
2. Add quiz: "JS Basics Quiz"
3. Set passing score: 70%
4. Add questions:
   - "What is a variable?" (1 point)
   - "How do you declare a function?" (2 points)
   - "What is an array?" (1 point)
5. Publish quiz
6. Publish chapter

### Student Takes Quiz

1. Goes to "Introduction to JavaScript" chapter
2. Watches video
3. Scrolls to quizzes
4. Clicks "Start Quiz" on "JS Basics Quiz"
5. Answers 3 questions
6. Submits quiz
7. Scores 75% (3/4 points)
8. ✅ Passes!
9. Reviews answers
10. Continues to next chapter

---

## 📚 Additional Resources

- **User Guide**: See `QUIZ_FEATURE_GUIDE.md`
- **Admin Setup**: See `ADMIN_SETUP.md`
- **Credentials**: See `CREDENTIALS.md`

---

**Questions?** Contact: kwadjo@learning.com

**Enjoy the quiz feature!** 🎓✨

