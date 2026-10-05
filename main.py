import needle

# 1. Define a tool function with type annotations and docstring
@needle.tool
def get_weather(city: str):
    """Get the current weather for a city."""
    return {"city": city, "temp_c": 22, "condition": "Sunny"}

# 2. Initialize the agent with your tool
agent = needle.Needle(tools=[get_weather])

# 3. Query the agent
response = agent.run("What's the weather like in Tokyo right now?")

# 4. View results
print("Function Calls:", response.get("function_calls"))
print("Execution Result:", response.get("results"))