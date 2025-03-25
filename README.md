# Eduaize

**Eduaize** is an AI-powered performance analytics dashboard designed to enhance communication between students, teachers, school administrators, and parents. It leverages AI to track student performance, recommend personalized study resources, highlight academic weaknesses, and streamline administrative tasks. With dedicated dashboards for each user role.

## Features

### Admin Dashboard

- Manage students and teachers
- Assign teachers to classes
- Export and download student performance reports
- View student performance charts
- Send notifications to other dashboards

### Student Dashboard

- Track academic performance over the years
- Compare grades with other students
- AI-generated study plans and insights
- Receive motivational quotes based on performance
- Send notifications to other dashboards

### Teacher Dashboard

- Track and analyze student performance with charts
- Upload student grades
- Send notifications to students, parents, and admin
- Manage assigned students

### Parent Dashboard

- Monitor child’s academic progress
- Contact teachers directly
- Receive notifications and updates

## Tech Stack

Eduaize is built using modern web technologies:

- **Frontend:** Nuxt 3, Vue.js, Tailwind CSS
- **State Management:** Pinia
- **Data Handling:** Supabase, Axios
- **Charts & Visualization:** Chart.js, Vue-Chartjs
- **UI Components:** Radix-Vue
- **Notifications:** Vue-Toastification

## Installation & Setup

To set up Eduaize locally, follow these steps:

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/olaniyansheyi/eduaize
   cd eduaize
   ```

2. **Install Dependencies:**

   ```sh
   npm install
   ```

3. **Run the Development Server:**

   ```sh
   npm run dev
   ```

4. **Build for Production:**
   ```sh
   npm run build
   ```

## AI Features & Challenges Overcome

Implementing AI-powered study plans and insights was a challenge due to the complexity of analyzing student performance dynamically. However, by leveraging **Supabase** for efficient data handling and AI models to generate insights, this feature was successfully integrated.

## Future Updates

- **Enhanced AI recommendations:** More advanced study plans and insights based on deep learning.
- **Real-time chat feature:** Enable direct communication between teachers, students, and parents.
- **Gamification:** Introduce badges and achievements to motivate students.
- **Mobile App Integration:** Develop a mobile version of Eduaize for better accessibility.

## Contributing

Eduaize is an open-source project, and contributions are welcome! Here’s how you can contribute:

1. **Fork the repository**
2. **Create a new branch:** `git checkout -b feature-name`
3. **Make your changes** and commit them
4. **Push to your branch:** `git push origin feature-name`
5. **Submit a pull request**

### Areas to Contribute:

- UI/UX improvements
- New AI-based performance tracking features
- Performance optimizations

---

If you find Eduaize helpful, don’t forget to give it a star on GitHub sir/ma!
