import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import { connectToMongoDB } from './connect.js';
import Url from './models/url.js';
import { nanoid } from 'nanoid';
import { Client, GatewayIntentBits } from 'discord.js';

// Connect to MongoDB
connectToMongoDB('mongodb://localhost:27017/discordUrl')
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Initialize Discord client
const client = new Client({ 
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Check if message starts with 'create'
    if (message.content.toLowerCase().startsWith('create')) {
        const url = message.content.split('create')[1]?.trim();
        if (!url) {
            return message.reply({ content: 'Please provide a URL after the create command.' });
        }
        
        // Generate a unique short ID
        const shortId = nanoid(6);
        
        // Store in MongoDB
        try {
            const newUrl = new Url({ shortId, originalUrl: url });
            await newUrl.save();
            
            return message.reply({
                content: `Generated Short ID for ${url}: ${shortId}`,
            });
        } catch (error) {
            console.error('Error saving URL:', error);
            return message.reply({
                content: 'There was an error generating the short URL. Please try again later.',
            });
        }
    } else {
        message.reply({ content: "Hi from bot" });
    }
});

client.on('interactionCreate', (interaction) => {
    console.log(interaction);
    interaction.reply("pong!!");
});

client.login(process.env.DISCORD_TOKEN);
