<template>
  <div class="relative">
    <NuxtLayout>
      <NuxtPage />
      <SearchTab v-if="searchStore.openSearch" />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useSearchStore } from "~/stores/search.js";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

const searchStore = useSearchStore();
onMounted(() => {
  if (process.client) {
    authStore.loadUser(); // This will now work only on the client

    if (authStore.user) {
      authStore.getCurrentUser();
    }
  }
});
</script>

<!-- You're building something awesome! Let’s break everything down step by step so you can move forward smoothly. 🚀  

---  

## **1️⃣ Choosing Between High School vs. University**  
### ✅ **Best Choice:** High School  
Why?  
- **More structured data** (Fixed subjects, fixed attendance tracking).  
- **More impactful AI insights** (Teachers need more support in tracking progress).  
- **Easier UX/UI** (University data is more complex with electives, varying credit systems).  

---

## **2️⃣ Supabase Database Structure**  
Since you're using **Supabase**, your database should follow a **relational structure** with tables connected via **foreign keys**.  

### **🛠️ Suggested Database Schema**  

#### **👨‍🏫 Teachers Table**  
| Column Name      | Type           | Description |
|-----------------|---------------|-------------|
| id              | UUID (Primary Key) | Unique ID for each teacher |
| name            | TEXT          | Full name |
| email           | TEXT (Unique) | Email for authentication |
| subject         | TEXT[]        | List of subjects they teach |
| created_at      | TIMESTAMP     | When the teacher joined |

#### **📚 Students Table**  
| Column Name      | Type           | Description |
|-----------------|---------------|-------------|
| id              | UUID (Primary Key) | Unique ID for each student |
| name            | TEXT          | Full name |
| email           | TEXT (Unique) | Email for authentication |
| class           | TEXT          | E.g., "Grade 10A" |
| guardian_email  | TEXT          | Parent/Guardian contact |
| created_at      | TIMESTAMP     | When the student joined |

#### **📖 Subjects Table**  
| Column Name      | Type           | Description |
|-----------------|---------------|-------------|
| id              | UUID (Primary Key) | Unique subject ID |
| name            | TEXT          | Subject name (e.g., "Mathematics") |

#### **📊 Performance Table** (Tracks student grades, attendance & participation)  
| Column Name      | Type           | Description |
|-----------------|---------------|-------------|
| id              | UUID (Primary Key) | Unique performance record ID |
| student_id      | UUID (Foreign Key → Students) | The student being evaluated |
| subject_id      | UUID (Foreign Key → Subjects) | The subject the score is for |
| teacher_id      | UUID (Foreign Key → Teachers) | The teacher assigning the score |
| attendance      | INT (0-100) | Attendance percentage |
| test_score      | INT (0-100) | Score from tests & assignments |
| participation   | INT (0-100) | Class engagement score |
| final_grade     | VARCHAR(2) | A, B, C, etc. |
| created_at      | TIMESTAMP     | Timestamp of the record |

#### **📣 Notifications Table** (For alerts to parents & students)  
| Column Name      | Type           | Description |
|-----------------|---------------|-------------|
| id              | UUID (Primary Key) | Notification ID |
| student_id      | UUID (Foreign Key → Students) | Who the notification is for |
| message         | TEXT          | Notification content |
| status          | BOOLEAN       | Read/Unread |
| created_at      | TIMESTAMP     | When it was created |

---

## **3️⃣ Should This App Be Read-Only?**  
**No.** The app should be a **CRUD-based** system where:  
- **Teachers can:** Add/edit students' grades, attendance, and performance.  
- **Students can:** View their progress and receive AI-powered recommendations.  
- **Parents can:** Get notifications about their child’s progress.  

---

## **4️⃣ Representing Student Performance in Chart.js**  
**Best approach:** Use a combination of different **Chart.js** types for clarity. 
 

### **📊 Recommended Charts**  
1. **Line Chart** → Tracks **student progress over time** (Test Scores, Attendance).  
2. **Bar Chart** → Compares **different students in a class** (Classroom Analytics).  
3. **Radar Chart** → Shows **overall student strengths & weaknesses** (Performance Breakdown).  
4. **Pie Chart** → Displays **engagement distribution** (Participation, Homework Completion).  

---

## **5️⃣ Features & Menus for Each Dashboard**  

### **👨‍🏫 Teachers Dashboard**  
**Main Menu Items:**  
✅ **Home** → Overview of class performance (Avg. grade, top students, at-risk students).  
✅ **Manage Students** → Add/update students, assign to classes.  
✅ **Performance Reports** → View/edit student test scores, attendance, participation.  
✅ **Classroom Analytics** → Insights on student engagement & improvement areas.  
✅ **Alerts & Notifications** → Send progress alerts to parents.  

---

### **📊 Student Dashboard**  
**Main Menu Items:**  
✅ **Dashboard** → Personal academic performance, charts & insights.  
✅ **Goals & Tracking** → Set study goals & receive AI-based recommendations.  
✅ **Study Resources** → Suggested materials based on weak subjects.  
✅ **Notifications** → Updates from teachers on assignments & performance.  

---

### **📡 Parent Dashboard**  
**Main Menu Items:**  
✅ **Dashboard** → Child’s academic performance & improvement insights.  
✅ **Alerts & Reports** → View notifications on attendance, grades, AI recommendations.  
✅ **Contact Teachers** → Direct chat feature for teacher-parent communication.  

---

### **🏫 Admin Dashboard**  
**Main Menu Items:**  
✅ **Manage Users** → Add/edit students, teachers, parents.  
✅ **Performance Overview** → View school-wide student analytics.  
✅ **Data Export** → Generate reports for school administration.  
✅ **System Logs** → Track activities across the platform.  

---

## **6️⃣ Next Steps to Continue Development**  

### **🔹 First: Complete the Teacher’s Dashboard**
1️⃣ **Set up your Supabase tables** (Use the schema above).  
2️⃣ **Build a page to display student list** with performance summary.  
3️⃣ **Create a page to add/edit student grades** (form inputs with test scores, attendance, participation).  
4️⃣ **Integrate Chart.js for visualizing class performance** (Bar Chart for comparisons).  
5️⃣ **Create AI-powered alerts for students at risk** (If grade < 50%, show alert "Needs Attention!").  

### **🔹 After That: Add the Other Dashboards**
- Parent Portal with real-time updates.  
- Student Portal with study goal tracking.  
- Admin Dashboard for managing teachers/students.  

---

## **🚀 Final Thoughts**
You're on the right track! Now that you have:  
✅ **A solid database structure** (Supabase ✅).  
✅ **Defined dashboards with clear menus & features**.  
✅ **A plan for using Chart.js effectively**.  
✅ **A roadmap for what to build next**.  

You can now continue building **step by step**. Let me know if you need help with specific **Nuxt.js or Supabase queries**! 🚀🔥 -->
