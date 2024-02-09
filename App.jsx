import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Image, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Base URL for the API
const BASE_URL = 'https://dummyjson.com/products';

// Product List Screen component
const ProductListScreen = ({ navigation }) => {
  // State to manage loading state and product data
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // Fetch products from the API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      // Extracting the 'products' array from the response data
      const productsData = data.products;
      setProducts(productsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products: ', error);
      setLoading(false);
    }
  };

  // Render individual product items
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}>
      <View style={styles.card}>
        <Image source={{ uri: item.thumbnail }} style={styles.productImageRound} />
        <View style={styles.detailsColumn}>
          <Text style={styles.productName}>{item.title}</Text>
          <Text style={styles.productDescription}>{item.description}</Text>
          <Text style={styles.productPrice}>${item.price}</Text>
          <Text style={styles.productStock}>Stock: {item.stock}</Text>
          <Text style={styles.productBrand}>Brand: {item.brand}</Text>
          <Text style={styles.productCategory}>Category: {item.category}</Text>
          <Text style={styles.productRating}>Rating: {item.rating}</Text>
          <Text style={styles.productDiscount}>Discount: {item.discountPercentage}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

// Product Details Screen component
const ProductDetailsScreen = ({ route }) => {
  const { productId } = route.params;
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    fetchProductDetails(productId);
  }, [productId]);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(`${BASE_URL}/${productId}`);
      const data = await response.json();
      setProductDetails(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product details: ', error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={{ alignItems: 'center'}}>
          <Image source={{ uri: productDetails.thumbnail }} style={styles.productImageRound} />
          <View style={{marginTop:50,alignItems:'center'}}>
            <Text style={styles.productName}>{productDetails.title}</Text>
            <Text style={styles.productDescription}>{productDetails.description}</Text>
            <Text style={styles.productPrice}>${productDetails.price}</Text>
            <Text style={styles.productStock}>Stock: {productDetails.stock}</Text>
            <Text style={styles.productBrand}>Brand: {productDetails.brand}</Text>
            <Text style={styles.productCategory}>Category: {productDetails.category}</Text>
            <Text style={styles.productRating}>Rating: {productDetails.rating}</Text>
            <Text style={styles.productDiscount}>Discount: {productDetails.discountPercentage}%</Text>
          </View>
        </View>
      )}
    </View>
  );
};

// Stack Navigator for navigation
const Stack = createNativeStackNavigator();

// App component
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ProductList" component={ProductListScreen} options={{ title: 'Product List' }} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  card: {
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    elevation: 10,
    alignItems: 'center',
  },
  productImageRound: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50, 
    marginRight: 10,
  },
  detailsColumn: {
    flex: 1, 
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,

  },
  productDescription: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  productStock: {
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
  },
  productBrand: {
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
  },
  productCategory: {
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
  },
  productRating: {
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
  },
  productDiscount: {
    fontSize: 14,
    color: 'black',
    marginBottom: 5,
  },
});


export default App;
