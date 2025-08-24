// Simple test script to check backend connectivity
// Run this with: node test-backend.js

const axios = require("axios");

async function testBackend() {
  console.log("Testing backend connectivity...");

  try {
    // Test basic connectivity
    console.log("\n1. Testing basic connectivity...");
    const response = await axios.get("http://localhost:3000/");
    console.log("✅ Backend is accessible:", response.status);
  } catch (err) {
    console.log("❌ Backend connectivity failed:", err.message);
  }

  try {
    // Test login endpoint
    console.log("\n2. Testing login endpoint...");
    const loginData = {
      email: "test@example.com",
      password: "testpassword",
    };

    const loginResponse = await axios.post(
      "http://localhost:3000/auth/login",
      loginData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Login endpoint responded:", loginResponse.status);
    console.log("Response:", loginResponse.data);
  } catch (err) {
    console.log("❌ Login endpoint test failed:");
    if (err.response) {
      console.log("Status:", err.response.status);
      console.log("Data:", err.response.data);
    } else {
      console.log("Error:", err.message);
    }
  }

  try {
    // Test with wrong endpoint
    console.log("\n3. Testing wrong endpoint (should fail)...");
    const wrongResponse = await axios.post("http://localhost:3000/login", {});
    console.log(
      "❌ Wrong endpoint should have failed but got:",
      wrongResponse.status
    );
  } catch (err) {
    console.log("✅ Wrong endpoint correctly failed:", err.message);
  }
}

testBackend().catch(console.error);
