import { Task } from "@/type/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task>();
  const body = "Achieve IT!";

  const scheduleNotification = async (title: string) => {
    const notificationID = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 120,
      },
    });
    return notificationID;
  };

  // Store Tasks
  useEffect(() => {
    if (!isLoaded) return;
    const saveTaskToStorage = async () => {
      try {
        await AsyncStorage.setItem("TASKS", JSON.stringify(tasks));
      } catch (e) {
        console.log(e);
      }
    };
    saveTaskToStorage();
  }, [tasks, isLoaded]);

  // Load Tasks
  useEffect(() => {
    const loadTaskFromStorage = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("TASKS");
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoaded(true);
      }
    };
    loadTaskFromStorage();
  }, []);

  const addTask = async () => {
    if (task.trim()) {
      const notificationId = await scheduleNotification(task.trim());
      const newTask = {
        id: Date.now(),
        title: task.trim(),
        isCompleted: false,
        notificationId,
      };
      setTasks([...tasks, newTask]);
      setTask("");
    }
  };

  const updateTask = async () => {
    const updatedTask = tasks.map((t) =>
      t.id === selectedTask?.id ? { ...t, isCompleted: !t.isCompleted } : t,
    );
    setTasks(updatedTask);
    AsyncStorage.setItem("TASKS", JSON.stringify(updatedTask));
    setShowModal(false);
  };

  const deleteTask = async () => {
    if (selectedTask?.notificationId) {
      try {
        await Notifications.cancelScheduledNotificationAsync(
          selectedTask.notificationId,
        );
      } catch (e) {
        console.log("Failed to cancel notification:", e);
      }
    }
    const filteredTask = tasks.filter((t) => t.id !== selectedTask?.id);
    setTasks(filteredTask);
    AsyncStorage.setItem("TASKS", JSON.stringify(filteredTask));
    setShowModal(false);
  };

  const resetStorage = async () => {
    try {
      if (tasks.length > 0) {
        await Notifications.cancelAllScheduledNotificationsAsync();
        setTasks([]);
        await AsyncStorage.removeItem("TASKS");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  const totalTasks = tasks.length;

  return (
    <>
      <SafeAreaView className="bg-[#0F172A] flex-1">
        {/* Enhanced Modal with Better Design */}
        {showModal && selectedTask && (
          <View className="absolute z-10 top-0 left-0 right-0 bottom-0 bg-black/70 justify-center items-center px-6">
            <View className="bg-[#1E293B] w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-600">
              {/* Modal Header */}
              <View className="items-center mb-6">
                <View className="w-12 h-1 bg-slate-600 rounded-full mb-4" />
                <Text className="text-slate-100 text-xl font-bold text-center">
                  {selectedTask.title}
                </Text>
                <Text className="text-slate-400 text-sm mt-1">
                  {selectedTask.isCompleted ? "Completed" : "Pending"}
                </Text>
              </View>

              {/* Action Buttons */}
              <Pressable
                onPress={updateTask}
                className={`${selectedTask.isCompleted ? "bg-amber-500" : "bg-emerald-500"} rounded-2xl py-4 px-6 mb-3 shadow-lg`}
              >
                <Text className="text-white text-center font-semibold text-base">
                  {selectedTask.isCompleted
                    ? "Mark as Incomplete"
                    : "Mark as Complete"}
                </Text>
              </Pressable>

              <Pressable
                onPress={deleteTask}
                className="bg-red-500 rounded-2xl py-4 px-6 mb-3 shadow-lg"
              >
                <Text className="text-white text-center font-semibold text-base">
                  Delete Task
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setShowModal(false)}
                className="bg-slate-600 rounded-2xl py-4 px-6"
              >
                <Text className="text-slate-200 text-center font-semibold text-base">
                  Cancel
                </Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Header Section with Stats */}
        <View className="px-6 pt-4 pb-6">
          <View className="flex-row justify-between items-start mb-4">
            <View>
              <Text className="text-slate-200 text-3xl font-bold">
                My Tasks
              </Text>
              <Text className="text-slate-400 text-base mt-1">
                {completedTasks} of {totalTasks} completed
              </Text>
            </View>
            <Pressable
              onPress={resetStorage}
              className="bg-slate-700 px-4 py-2 rounded-xl border border-cyan-500"
            >
              <Text className="text-slate-300 font-medium">Reset</Text>
            </Pressable>
          </View>

          {/* Progress Bar */}
          {totalTasks > 0 && (
            <View className="bg-slate-700 h-2 rounded-full overflow-hidden mb-4">
              <View
                className="bg-cyan-500 h-full rounded-full"
                style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
              />
            </View>
          )}
        </View>

        {/* Input Section with Modern Design */}
        <View className="px-6 mb-6">
          <View className="bg-[#1E293B] rounded-2xl p-4 border border-slate-600 shadow-lg">
            <TextInput
              placeholder="What needs to be done?"
              value={task}
              className="text-slate-100 text-base py-2"
              cursorColor="#06B6D4"
              placeholderTextColor="#64748B"
              onChangeText={(text) => setTask(text)}
              onSubmitEditing={addTask}
              returnKeyType="done"
            />
            <Pressable
              onPress={addTask}
              className="bg-cyan-500 rounded-xl py-3 px-6 mt-3 self-end shadow-lg"
            >
              <Text className="text-white font-semibold">Add Task</Text>
            </Pressable>
          </View>
        </View>

        {/* Tasks List */}
        <View className="flex-1 px-6">
          {tasks.length === 0 ? (
            <View className="flex-1 justify-center items-center">
              <Text className="text-slate-400 text-lg text-center">
                No tasks yet{"\n"}Add one above to get started! 🎯
              </Text>
            </View>
          ) : (
            <>
              <Text className="text-slate-300 text-lg font-semibold mb-4">
                Your Tasks
              </Text>
              <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <Pressable
                    onPress={() => {
                      setSelectedTask(item);
                      setShowModal(true);
                    }}
                    className={`mb-3 p-4 rounded-2xl border shadow-lg ${
                      item.isCompleted
                        ? "bg-[#1E293B] border-emerald-500/30"
                        : "bg-[#1E293B] border-slate-600"
                    }`}
                  >
                    <View className="flex-row items-center">
                      {/* Custom Checkbox */}
                      <View
                        className={`w-6 h-6 rounded-full mr-3 border-2 items-center justify-center ${
                          item.isCompleted
                            ? "bg-emerald-500 border-emerald-500"
                            : "border-slate-500"
                        }`}
                      >
                        {item.isCompleted && (
                          <Text className="text-white text-xs font-bold">
                            ✓
                          </Text>
                        )}
                      </View>

                      {/* Task Text */}
                      <Text
                        className={`flex-1 text-base ${
                          item.isCompleted
                            ? "line-through text-slate-400"
                            : "text-slate-100"
                        }`}
                      >
                        {item.title}
                      </Text>
                    </View>
                  </Pressable>
                )}
              />
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;
