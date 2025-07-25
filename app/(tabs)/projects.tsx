import { Project } from "@/type/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { Link, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projecttitle, setProjectTitle] = useState("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const body = "Congratulations on new Project!"


  const scheduleNotification = async (title: string) => {
      const notificationID = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 300,
        },
      });
      return notificationID;
    };


  // Store Tasks
  useEffect(() => {
    if (!isLoaded) return;
    const saveProjectsToStorage = async () => {
      try {
        await AsyncStorage.setItem("PROJECTS", JSON.stringify(projects));
      } catch (e) {
        console.log(e);
      }
    };
    saveProjectsToStorage();
  }, [projects, isLoaded]);

  // Load Tasks
  useFocusEffect(
    useCallback(() => {
      const loadProjectsFromStorage = async () => {
        try {
          const storedProjects = await AsyncStorage.getItem("PROJECTS");
          if (storedProjects) {
            setProjects(JSON.parse(storedProjects));
          } else {
            setProjects([]);
          }
        } catch (e) {
          console.log(e);
        } finally {
          setIsLoaded(true);
        }
      };
      loadProjectsFromStorage();
    }, [])
  );

  const createProject = async () => {
    if (projecttitle.trim()) {
      const notificationId = await scheduleNotification(projecttitle.trim());
      const newProject = {
        id: Date.now(),
        projectName: projecttitle.trim(),
        projectTasks: [],
        notificationId
      };
      setProjects([...projects, newProject]);
      setProjectTitle("");
    }
  };

  const resetStorage = async () => {
    try {
      if (projects.length > 0) {
        setProjects([]);
        await AsyncStorage.removeItem("PROJECTS");
      }
    } catch (e) {
      console.log(e);
    }
  };

  // const completedTasks = tasks.filter((task) => task.isCompleted).length;
  // const totalTasks = tasks.length;

  return (
    <>
      <SafeAreaView className="bg-[#0F172A] flex-1">
        {/* Header Section with Stats */}
        <View className="px-6 pt-4 pb-6">
          <View className="flex-row justify-between items-start mb-4">
            <View>
              <Text className="text-slate-200 text-3xl font-bold">
                Projects
              </Text>
            </View>
            <Pressable
              onPress={resetStorage}
              className="bg-slate-700 px-4 py-2 rounded-xl border border-cyan-500"
            >
              <Text className="text-slate-300 font-medium">Reset</Text>
            </Pressable>
          </View>
        </View>

        {/* Input Section with Modern Design */}
        <View className="px-6 mb-6">
          <View className="bg-[#1E293B] rounded-2xl p-4 border border-slate-600 shadow-lg">
            <TextInput
              placeholder="Let's work on a Project"
              value={projecttitle}
              className="text-slate-100 text-base py-2"
              cursorColor="#06B6D4"
              placeholderTextColor="#64748B"
              onChangeText={(text) => setProjectTitle(text)}
              onSubmitEditing={createProject}
              returnKeyType="done"
            />
            <Pressable
              onPress={createProject}
              className="bg-cyan-500 rounded-xl py-3 px-6 mt-3 self-end shadow-lg"
            >
              <Text className="text-white font-semibold">Create Project</Text>
            </Pressable>
          </View>
        </View>

        <View className="flex-1 px-6">
          {projects.length === 0 ? (
            <View className="flex-1 justify-center items-center">
              <Text className="text-slate-400 text-lg text-center">
                No Projects yet{"\n"}Add one above to get started! 🎯
              </Text>
            </View>
          ) : (
            <>
              <Text className="text-slate-300 text-lg font-semibold mb-4">
                Your projects
              </Text>
              <FlatList
                data={projects}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }} // Space between columns
                contentContainerStyle={{ paddingBottom: 100 }} // Bottom padding for tab bar
                renderItem={({ item, index }) => (
                  <Link href={`/projectDetail/${item.id}`} asChild>
                    <Pressable
                      className={`mb-3 p-4 rounded-2xl border shadow-lg w-[48%]`}
                    >
                      <View className="mb-2">
                        {item.projectTasks.length > 0 && (
                          <View className="bg-slate-700 h-2 rounded-full overflow-hidden">
                            <View
                              className="bg-cyan-500 h-full rounded-full"
                              style={{
                                width: `${
                                  (item.projectTasks.filter(
                                    (t) => t.isCompleted
                                  ).length /
                                    item.projectTasks.length) *
                                  100
                                }%`,
                              }}
                            />
                          </View>
                        )}
                      </View>
                      <View className="flex-row items-center justify-center">
                        {/* Task Text */}
                        <Text
                          className={`p-4 text-base`}
                        >
                          {item.projectName}
                        </Text>
                      </View>
                    </Pressable>
                  </Link>
                )}
              />
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Projects;
