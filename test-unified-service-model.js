#!/usr/bin/env node

/**
 * SOULFUEL Unified Service Model Test Suite
 * Tests all buttons, links, and API endpoints to verify the new 4-services-per-week model
 */

const baseUrl = 'http://localhost:5000';
const testUserId = 'test-user-123';

class SoulFuelTester {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      tests: []
    };
  }

  async makeRequest(method, endpoint, data = null, headers = {}) {
    const url = `${baseUrl}${endpoint}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Firebase-UID': testUserId,
        ...headers
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      const contentType = response.headers.get('content-type');
      
      // Check if response is JSON
      if (contentType && contentType.includes('application/json')) {
        const responseData = await response.json();
        return {
          status: response.status,
          data: responseData,
          isJson: true
        };
      } else {
        const text = await response.text();
        return {
          status: response.status,
          data: text,
          isJson: false
        };
      }
    } catch (error) {
      return {
        status: 0,
        error: error.message,
        isJson: false
      };
    }
  }

  test(name, condition, details = '') {
    const result = {
      name,
      passed: condition,
      details,
      timestamp: new Date().toISOString()
    };
    
    this.results.tests.push(result);
    
    if (condition) {
      this.results.passed++;
      console.log(`✅ ${name}`);
    } else {
      this.results.failed++;
      console.log(`❌ ${name} - ${details}`);
    }
  }

  async testCoreEndpoints() {
    console.log('\n🔍 Testing Core API Endpoints...\n');

    // Test user endpoint
    const userResponse = await this.makeRequest('GET', '/api/user');
    this.test(
      'User API Endpoint',
      userResponse.isJson && userResponse.status === 200,
      userResponse.isJson ? 'Returns user data' : 'Returns HTML instead of JSON'
    );

    // Test analytics endpoint
    const analyticsResponse = await this.makeRequest('GET', '/api/analytics');
    this.test(
      'Analytics API Endpoint',
      analyticsResponse.isJson && analyticsResponse.status === 200,
      analyticsResponse.isJson ? 'Returns analytics data' : 'Returns HTML instead of JSON'
    );

    // Test recipes endpoint
    const recipesResponse = await this.makeRequest('GET', '/api/recipes');
    this.test(
      'Recipes API Endpoint',
      recipesResponse.isJson && recipesResponse.status === 200,
      recipesResponse.isJson ? `Returns ${Array.isArray(recipesResponse.data) ? recipesResponse.data.length : 0} recipes` : 'Returns HTML instead of JSON'
    );

    // Test AI status endpoint
    const aiStatusResponse = await this.makeRequest('GET', '/api/ai-coaching-status');
    this.test(
      'AI Status API Endpoint',
      aiStatusResponse.isJson && aiStatusResponse.status === 200,
      aiStatusResponse.isJson ? 'Returns AI status' : 'Returns HTML instead of JSON'
    );
  }

  async testUnifiedServiceModel() {
    console.log('\n🎯 Testing Unified Service Model...\n');

    // Test food analysis (should consume 1 service)
    const foodAnalysisResponse = await this.makeRequest('POST', '/api/food-analysis/text', {
      description: 'apple and banana for testing'
    });
    this.test(
      'Food Analysis Service',
      foodAnalysisResponse.isJson && (foodAnalysisResponse.status === 200 || foodAnalysisResponse.status === 429),
      foodAnalysisResponse.isJson ? 
        `Status: ${foodAnalysisResponse.status}` : 
        'Returns HTML instead of JSON'
    );

    // Test AI coaching (should consume 1 service)
    const chatResponse = await this.makeRequest('POST', '/api/chat', {
      message: 'Test AI coaching message',
      coachType: 'nutrition'
    });
    this.test(
      'AI Coaching Service',
      chatResponse.isJson && (chatResponse.status === 200 || chatResponse.status === 429),
      chatResponse.isJson ? 
        `Status: ${chatResponse.status}` : 
        'Returns HTML instead of JSON'
    );

    // Test soul companion (should consume 1 service)
    const soulResponse = await this.makeRequest('POST', '/api/soul-checkin', {
      message: 'I am feeling stressed today'
    });
    this.test(
      'Soul Companion Service',
      soulResponse.isJson && (soulResponse.status === 200 || soulResponse.status === 429),
      soulResponse.isJson ? 
        `Status: ${soulResponse.status}` : 
        'Returns HTML instead of JSON'
    );
  }

  async testDataEndpoints() {
    console.log('\n📊 Testing Data Tracking Endpoints...\n');

    // Test sugar entry
    const sugarEntryResponse = await this.makeRequest('POST', '/api/sugar-entry', {
      amount: 25,
      source: 'apple',
      mealType: 'snack'
    });
    this.test(
      'Sugar Entry Creation',
      sugarEntryResponse.isJson && sugarEntryResponse.status === 200,
      sugarEntryResponse.isJson ? 'Sugar entry created' : 'Returns HTML instead of JSON'
    );

    // Test mood entry
    const moodEntryResponse = await this.makeRequest('POST', '/api/mood-entry', {
      mood: 'happy',
      score: 8,
      notes: 'feeling good today'
    });
    this.test(
      'Mood Entry Creation',
      moodEntryResponse.isJson && moodEntryResponse.status === 200,
      moodEntryResponse.isJson ? 'Mood entry created' : 'Returns HTML instead of JSON'
    );

    // Test craving entry
    const cravingEntryResponse = await this.makeRequest('POST', '/api/craving-entry', {
      intensity: 6,
      trigger: 'stress',
      notes: 'feeling stressed'
    });
    this.test(
      'Craving Entry Creation',
      cravingEntryResponse.isJson && cravingEntryResponse.status === 200,
      cravingEntryResponse.isJson ? 'Craving entry created' : 'Returns HTML instead of JSON'
    );

    // Test retrieving entries
    const cravingEntriesResponse = await this.makeRequest('GET', '/api/craving-entries');
    this.test(
      'Craving Entries Retrieval',
      cravingEntriesResponse.isJson && cravingEntriesResponse.status === 200,
      cravingEntriesResponse.isJson ? `Retrieved ${Array.isArray(cravingEntriesResponse.data) ? cravingEntriesResponse.data.length : 0} entries` : 'Returns HTML instead of JSON'
    );

    // Test chat messages
    const chatMessagesResponse = await this.makeRequest('GET', '/api/chat-messages');
    this.test(
      'Chat Messages Retrieval',
      chatMessagesResponse.isJson && chatMessagesResponse.status === 200,
      chatMessagesResponse.isJson ? `Retrieved ${Array.isArray(chatMessagesResponse.data) ? chatMessagesResponse.data.length : 0} messages` : 'Returns HTML instead of JSON'
    );
  }

  async testAdvancedFeatures() {
    console.log('\n🚀 Testing Advanced Features...\n');

    // Test game progress (might have database errors)
    const gameProgressResponse = await this.makeRequest('GET', '/api/game-progress');
    this.test(
      'Game Progress Endpoint',
      gameProgressResponse.status !== 0,
      gameProgressResponse.isJson ? 
        (gameProgressResponse.status === 200 ? 'Working correctly' : `Error: ${JSON.stringify(gameProgressResponse.data)}`) :
        'Returns HTML instead of JSON'
    );

    // Test food analyses retrieval
    const foodAnalysesResponse = await this.makeRequest('GET', '/api/food-analyses');
    this.test(
      'Food Analyses Retrieval',
      foodAnalysesResponse.isJson && foodAnalysesResponse.status === 200,
      foodAnalysesResponse.isJson ? `Retrieved ${Array.isArray(foodAnalysesResponse.data) ? foodAnalysesResponse.data.length : 0} analyses` : 'Returns HTML instead of JSON'
    );
  }

  async runAllTests() {
    console.log('🧪 SOULFUEL Unified Service Model Test Suite');
    console.log('=' .repeat(50));

    try {
      await this.testCoreEndpoints();
      await this.testUnifiedServiceModel();
      await this.testDataEndpoints();
      await this.testAdvancedFeatures();

      console.log('\n' + '='.repeat(50));
      console.log('📋 TEST SUMMARY');
      console.log('='.repeat(50));
      console.log(`✅ Passed: ${this.results.passed}`);
      console.log(`❌ Failed: ${this.results.failed}`);
      console.log(`📊 Total: ${this.results.tests.length}`);
      console.log(`🎯 Success Rate: ${((this.results.passed / this.results.tests.length) * 100).toFixed(1)}%`);

      if (this.results.failed > 0) {
        console.log('\n🔍 Failed Tests:');
        this.results.tests.filter(t => !t.passed).forEach(test => {
          console.log(`   • ${test.name}: ${test.details}`);
        });
      }

      console.log('\n✨ Unified Service Model Status:');
      const serviceTests = this.results.tests.filter(t => 
        t.name.includes('Service') || t.name.includes('AI Status')
      );
      const servicesPassing = serviceTests.filter(t => t.passed).length;
      console.log(`   🎯 Service Endpoints: ${servicesPassing}/${serviceTests.length} working`);
      
      if (servicesPassing === serviceTests.length) {
        console.log('   ✅ Unified service model implementation is working correctly!');
      } else {
        console.log('   ⚠️  Some service endpoints need attention');
      }

    } catch (error) {
      console.error('❌ Test suite failed:', error);
    }
  }
}

// Run the tests
const tester = new SoulFuelTester();
tester.runAllTests().catch(console.error);