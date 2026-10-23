import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./components/ScrollToTop";

import Layout from "./layouts/Layout";
import Home from "./pages/users/Home";
import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/Login";
import ProtectedLayout from "./layouts/ProtectedRoute";
import UserDashboard from "./pages/users/Dashboard";
import ChapterList from "./pages/users/AiHub/ChapterList";
import LessonList from "./pages/users/AiHub/LessonList";
import LessonView from "./pages/users/AiHub/LessonView";

import PromptVault from "./pages/PromptVault/PromptVault";

import JourneyList from "./pages/users/Journeys/JourneyList";
import JourneyDetail from "./pages/users/Journeys/JourneyDetail";
import SubmitJourney from "./pages/users/Journeys/SubmitJourney";
import JourneyView from "./components/admin/journeys/JourneyView";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreatePrompt from "./pages/admin/Createprompt";
import Prompts from "./pages/admin/Prompts";
import PromptEdit from "./components/admin/promptVault/PromptEdit";
import CreatePromptCategory from "./pages/admin/PromptVault/CreatePromptCategory";
import PromptCategories from "./pages/admin/PromptVault/PromptCategories";
import PromptCategoryEdit from "./components/admin/promptVault/PromptCategoryEdit";
import CreateChapter from "./pages/admin/AiHub/CreateChapter";
import SeeChapters from "./pages/admin/AiHub/SeeChapters";
import ChapterEdit from "./components/admin/AiHub/ChapterEdit";
import CreateLesson from "./pages/admin/AiHub/CreateLesson";
import SeeLessons from "./pages/admin/AiHub/SeeLessons";
import LessonEdit from "./components/admin/AiHub/LessonEdit";
import CreateStory from "./pages/admin/AiHub/CreateStory";
import SeeStories from "./pages/admin/AiHub/SeeStories";
import StoryEdit from "./components/admin/AiHub/StoryEdit";
import CreateJourney from "./pages/admin/Journeys/CreateJourney";
import Journeys from "./pages/admin/Journeys/Journeys";
import JourneyEdit from "./components/admin/journeys/JourneyEdit";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/SignUp" element={<Auth />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Route>

          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<UserDashboard />}></Route>
            <Route path="/aiHub" element={<ChapterList />}></Route>
            <Route path="/aiHub/chapter/:id" element={<LessonList />}></Route>
            <Route path="/aiHub/lesson/:id" element={<LessonView />}></Route>
            <Route path="/promptVault" element={<PromptVault />}></Route>
            <Route path="/journeys" element={<JourneyList />}></Route>
            <Route path="/journeys/:id" element={<JourneyDetail />}></Route>
            <Route path="/submit" element={<SubmitJourney />}></Route>
            <Route path="/admin/journeyView/:id" element={<JourneyView />}></Route>
          </Route>

          {/* Admin Route  */}

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
            <Route path="/admin/promptVault" element={<CreatePrompt />}></Route>
            <Route
              path="/admin/promptVault/promptList"
              element={<Prompts />}
            ></Route>
            <Route
              path="/admin/promptEdit/:id"
              element={<PromptEdit />}
            ></Route>

            <Route
              path="/admin/promptVault/createCategory"
              element={<CreatePromptCategory />}
            ></Route>
            <Route
              path="/admin/promptVault/categoryList"
              element={<PromptCategories />}
            ></Route>
            <Route
              path="/admin/promptVault/categoryEdit/:id"
              element={<PromptCategoryEdit />}
            ></Route>

            <Route path="/admin/aiHub" element={<CreateChapter />}></Route>
            <Route
              path="/admin/aiHub/chapterList"
              element={<SeeChapters />}
            ></Route>
            <Route
              path="/admin/aiHub/chapterEdit/:id"
              element={<ChapterEdit />}
            ></Route>

            <Route
              path="/admin/aiHub/createLesson"
              element={<CreateLesson />}
            ></Route>
            <Route
              path="/admin/aiHub/lessonList"
              element={<SeeLessons />}
            ></Route>
            <Route
              path="/admin/aiHub/lessonEdit/:id"
              element={<LessonEdit />}
            ></Route>

            <Route
              path="/admin/aiHub/createStory"
              element={<CreateStory />}
            ></Route>
            <Route
              path="/admin/aiHub/storyList"
              element={<SeeStories />}
            ></Route>
            <Route
              path="/admin/aiHub/storyEdit/:id"
              element={<StoryEdit />}
            ></Route>

            <Route path="/admin/journeys" element={<CreateJourney />}></Route>
            <Route
              path="/admin/journeys/journeyList"
              element={<Journeys />}
            ></Route>
            <Route
              path="/admin/journeyEdit/:id"
              element={<JourneyEdit />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </>
  );
};

export default App;
