import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import axios from 'axios';

// Define the homepage component
const HomePage = () => {
  const [recentImages, setRecentImages] = useState([]);

  useEffect(() => {
    fetchRecentImages();
  }, []);

  const fetchRecentImages = async () => {
    try {
      const response = await axios.get(
        'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713&format=json&nojsoncallback=1&extras=url_s'
      );
      const photos = response.data.photos.photo;
      const images = photos.map(photo => ({
        id: photo.id,
        url: photo.url_s,
        title: photo.title
      }));
      setRecentImages(images);
    } catch (error) {
      console.error('Error fetching recent images:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ padding: 20, fontSize: 20 }}>Home Page</Text>
      <ScrollView>
        {recentImages.map(image => (
          <Image
            key={image.id}
            source={{ uri: image.url }}
            style={{ width: 200, height: 200, margin: 10 }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

// Define the drawer content component
const DrawerContent = ({ navigation }) => {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={{ fontSize: 18 }}>Home</Text>
      </TouchableOpacity>
      {/* Add more options as needed */}
    </View>
  );
};

// Create a drawer navigator
const Drawer = createDrawerNavigator();

// Main component containing the navigation structure
const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={HomePage} />
        {/* Add more screens as needed */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
