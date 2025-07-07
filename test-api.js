// Quick API Testing Script
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:5000';

async function testAPI() {
  console.log('=== UnProcessed API Test Suite ===\n');

  // Test 1: Public endpoints
  console.log('1. Testing public analytics endpoint...');
  try {
    const response = await fetch(`${BASE_URL}/api/analytics`);
    const data = await response.json();
    console.log('✓ Analytics endpoint working:', data.weeklyStats);
  } catch (error) {
    console.log('✗ Analytics failed:', error.message);
  }

  // Test 2: Check if server is running
  console.log('\n2. Testing server health...');
  try {
    const response = await fetch(`${BASE_URL}/`);
    console.log(`✓ Server responding with status: ${response.status}`);
  } catch (error) {
    console.log('✗ Server unreachable:', error.message);
  }

  // Test 3: Test food analyses endpoint (should require auth)
  console.log('\n3. Testing food analyses endpoint (auth required)...');
  try {
    const response = await fetch(`${BASE_URL}/api/food-analyses`);
    if (response.status === 401) {
      console.log('✓ Authentication properly required');
    } else {
      const data = await response.json();
      console.log('Response:', data);
    }
  } catch (error) {
    console.log('✗ Food analyses test failed:', error.message);
  }

  // Test 4: Test recipes endpoint
  console.log('\n4. Testing recipes endpoint...');
  try {
    const response = await fetch(`${BASE_URL}/api/recipes`);
    const data = await response.json();
    console.log('✓ Recipes endpoint working, found', data.length, 'recipes');
  } catch (error) {
    console.log('✗ Recipes test failed:', error.message);
  }

  console.log('\n=== Test Complete ===');
}

testAPI();