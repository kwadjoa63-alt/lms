# NextLMS API Documentation

This document provides comprehensive information about the NextLMS API endpoints, request/response formats, and authentication requirements.

## 🔐 Authentication

All API endpoints require authentication using NextAuth.js sessions. Include the session cookie in your requests.

### Authentication Headers
```http
Cookie: next-auth.session-token=your-session-token
```

## 📚 Course Management API

### Get All Courses
```http
GET /api/courses
```

**Response:**
```json
[
  {
    "id": "course_id",
    "title": "Course Title",
    "description": "Course Description",
    "price": 99.99,
    "isPublished": true,
    "category": {
      "id": "category_id",
      "name": "Category Name"
    },
    "chapters": [
      {
        "id": "chapter_id",
        "title": "Chapter Title",
        "isPublished": true,
        "isFree": false
      }
    ]
  }
]
```

### Create Course
```http
POST /api/courses
Content-Type: application/json

{
  "title": "New Course",
  "description": "Course description",
  "price": 99.99,
  "categoryId": "category_id"
}
```

### Get Course by ID
```http
GET /api/courses/[courseId]
```

### Update Course
```http
PATCH /api/courses/[courseId]
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description"
}
```

### Publish/Unpublish Course
```http
PATCH /api/courses/[courseId]/publish
PATCH /api/courses/[courseId]/unpublish
```

## 📖 Chapter Management API

### Get Chapter
```http
GET /api/courses/[courseId]/chapters/[chapterId]
```

### Create Chapter
```http
POST /api/courses/[courseId]/chapters
Content-Type: application/json

{
  "title": "Chapter Title",
  "description": "Chapter description",
  "isFree": false
}
```

### Update Chapter
```http
PATCH /api/courses/[courseId]/chapters/[chapterId]
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  "videoUrl": "video_url"
}
```

### Reorder Chapters
```http
PUT /api/courses/[courseId]/chapters/reorder
Content-Type: application/json

{
  "list": [
    { "id": "chapter_id_1", "position": 0 },
    { "id": "chapter_id_2", "position": 1 }
  ]
}
```

### Publish/Unpublish Chapter
```http
PATCH /api/courses/[courseId]/chapters/[chapterId]/publish
PATCH /api/courses/[courseId]/chapters/[chapterId]/unpublish
```

### Update Chapter Progress
```http
PUT /api/courses/[courseId]/chapters/[chapterId]/progress
Content-Type: application/json

{
  "isCompleted": true
}
```

## 🧠 Quiz Management API

### Get Quizzes for Chapter
```http
GET /api/courses/[courseId]/chapters/[chapterId]/quizzes
```

**Response:**
```json
[
  {
    "id": "quiz_id",
    "title": "Quiz Title",
    "description": "Quiz description",
    "passingScore": 70,
    "isPublished": true,
    "questions": [
      {
        "id": "question_id",
        "question": "What is...?",
        "points": 10,
        "options": [
          {
            "id": "option_id",
            "text": "Option A",
            "isCorrect": true,
            "position": 0
          }
        ]
      }
    ]
  }
]
```

### Create Quiz
```http
POST /api/courses/[courseId]/chapters/[chapterId]/quizzes
Content-Type: application/json

{
  "title": "Quiz Title",
  "description": "Quiz description",
  "passingScore": 70
}
```

### Update Quiz
```http
PATCH /api/courses/[courseId]/chapters/[chapterId]/quizzes/[quizId]
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  "passingScore": 80
}
```

### Delete Quiz
```http
DELETE /api/courses/[courseId]/chapters/[chapterId]/quizzes/[quizId]
```

### Submit Quiz
```http
POST /api/courses/[courseId]/chapters/[chapterId]/quizzes/[quizId]/submit
Content-Type: application/json

{
  "answers": {
    "question_id_1": "option_id_1",
    "question_id_2": "option_id_2"
  }
}
```

**Response:**
```json
{
  "attemptId": "attempt_id",
  "score": 85.5,
  "passed": true,
  "totalPoints": 20,
  "earnedPoints": 17,
  "passingScore": 70,
  "answers": [
    {
      "questionId": "question_id_1",
      "answer": "option_id_1",
      "isCorrect": true
    }
  ]
}
```

### Get Quiz Attempts
```http
GET /api/courses/[courseId]/chapters/[chapterId]/quizzes/[quizId]/attempts
```

**Response:**
```json
[
  {
    "id": "attempt_id",
    "score": 85.5,
    "passed": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "answers": [
      {
        "questionId": "question_id_1",
        "answer": "option_id_1",
        "isCorrect": true
      }
    ]
  }
]
```

## 👥 User Management API

### Get User Profile
```http
GET /api/profile/[userId]
```

### Update User Profile
```http
PATCH /api/profile/[userId]
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "updated@email.com",
  "role": "TEACHER"
}
```

## 💳 Payment API

### Create Checkout Session
```http
POST /api/courses/[courseId]/checkout
```

**Response:**
```json
{
  "url": "https://checkout.stripe.com/pay/cs_..."
}
```

### Verify Purchase
```http
GET /api/courses/[courseId]/verify-purchase
```

**Response:**
```json
{
  "purchased": true,
  "purchaseDate": "2024-01-01T00:00:00.000Z"
}
```

### Handle Payment Success
```http
GET /api/courses/[courseId]/success?session_id=cs_...
```

## 📎 File Upload API

### Upload File
```http
POST /api/uploadthing
Content-Type: multipart/form-data

file: [file]
```

**Response:**
```json
{
  "url": "https://utfs.io/f/...",
  "name": "filename.pdf",
  "size": 1024
}
```

## 🔗 Webhook API

### Stripe Webhook
```http
POST /api/webhook
Content-Type: application/json
Stripe-Signature: t=...,v1=...

{
  "type": "checkout.session.completed",
  "data": {
    "object": {
      "id": "cs_...",
      "metadata": {
        "courseId": "course_id",
        "userId": "user_id"
      }
    }
  }
}
```

## 📊 Error Responses

### 400 Bad Request
```json
{
  "error": "Validation failed",
  "details": "Title is required"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "Something went wrong"
}
```

## 🔒 Rate Limiting

API endpoints are rate-limited to prevent abuse:

- **General endpoints**: 100 requests per minute
- **File uploads**: 10 requests per minute
- **Quiz submissions**: 5 requests per minute

## 📝 Request/Response Examples

### Creating a Complete Course

1. **Create Course:**
```http
POST /api/courses
{
  "title": "JavaScript Fundamentals",
  "description": "Learn JavaScript from scratch",
  "price": 99.99,
  "categoryId": "cat_123"
}
```

2. **Add Chapter:**
```http
POST /api/courses/course_123/chapters
{
  "title": "Variables and Data Types",
  "description": "Understanding JavaScript variables",
  "isFree": true
}
```

3. **Upload Video:**
```http
POST /api/uploadthing
[Upload video file]
```

4. **Update Chapter with Video:**
```http
PATCH /api/courses/course_123/chapters/chapter_456
{
  "videoUrl": "https://stream.mux.com/..."
}
```

5. **Create Quiz:**
```http
POST /api/courses/course_123/chapters/chapter_456/quizzes
{
  "title": "Variables Quiz",
  "description": "Test your knowledge of variables",
  "passingScore": 70
}
```

6. **Add Questions:**
```http
POST /api/courses/course_123/chapters/chapter_456/quizzes/quiz_789/questions
{
  "question": "What keyword declares a variable?",
  "points": 10,
  "options": [
    { "text": "var", "isCorrect": true, "position": 0 },
    { "text": "let", "isCorrect": true, "position": 1 },
    { "text": "const", "isCorrect": true, "position": 2 },
    { "text": "variable", "isCorrect": false, "position": 3 }
  ]
}
```

7. **Publish Everything:**
```http
PATCH /api/courses/course_123/publish
PATCH /api/courses/course_123/chapters/chapter_456/publish
PATCH /api/courses/course_123/chapters/chapter_456/quizzes/quiz_789/publish
```

## 🧪 Testing the API

### Using cURL
```bash
# Get all courses
curl -X GET http://localhost:3000/api/courses \
  -H "Cookie: next-auth.session-token=your-token"

# Create a course
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=your-token" \
  -d '{"title":"Test Course","description":"A test course"}'
```

### Using Postman
1. Import the API collection
2. Set up authentication
3. Test each endpoint
4. Verify responses

## 📈 Performance Considerations

- **Database Queries**: Use Prisma's `select` to limit returned fields
- **Pagination**: Implement pagination for large datasets
- **Caching**: Cache frequently accessed data
- **Rate Limiting**: Implement proper rate limiting
- **Error Handling**: Provide meaningful error messages

---

For more information, refer to the main README.md or create an issue in the GitHub repository.
