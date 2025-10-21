<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ItemSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // Pastikan users sudah ada
        $users = User::all();
        
        if ($users->isEmpty()) {
            $this->command->warn('No users found. Please run UserSeeder first.');
            return;
        }

        $items = [
            // Items untuk user pertama (Admin)
            [
                'title' => 'Project Management Tool Development',
                'description' => 'A comprehensive web application for managing projects and tasks with real-time team collaboration features, progress tracking, and reporting dashboard.',
                'user_id' => $users[0]->id,
                'created_at' => now()->subDays(10),
                'updated_at' => now()->subDays(5),
            ],
            [
                'title' => 'API Documentation Update',
                'description' => 'Complete and detailed documentation for all REST API endpoints including authentication methods, request/response examples, error codes, and rate limiting policies.',
                'user_id' => $users[0]->id,
                'created_at' => now()->subDays(8),
                'updated_at' => now()->subDays(3),
            ],
            [
                'title' => 'Database Schema Optimization',
                'description' => 'Redesign and optimize the database schema with proper indexing, relationships, constraints, and performance improvements for better query execution.',
                'user_id' => $users[0]->id,
                'created_at' => now()->subDays(15),
                'updated_at' => now()->subDays(2),
            ],
            [
                'title' => 'Mobile App UI/UX Design',
                'description' => 'Create modern and responsive mobile application designs with user-friendly interfaces, intuitive navigation, and accessibility features.',
                'user_id' => $users[0]->id,
                'created_at' => now()->subDays(12),
                'updated_at' => now()->subDays(1),
            ],

            // Items untuk user kedua (John Doe)
            [
                'title' => 'Weekly Grocery Shopping List',
                'description' => 'Essential items needed for the week including fresh fruits, vegetables, dairy products, protein sources, and household supplies. Budget: $150.',
                'user_id' => $users[1]->id,
                'created_at' => now()->subDays(3),
                'updated_at' => now()->subDays(1),
            ],
            [
                'title' => 'Fitness Training Program',
                'description' => 'Comprehensive 12-week workout schedule focusing on strength training, cardio, and flexibility. Includes exercise details, sets, reps, and rest periods.',
                'user_id' => $users[1]->id,
                'created_at' => now()->subDays(20),
                'updated_at' => now()->subDays(5),
            ],
            [
                'title' => '2024 Reading List',
                'description' => 'Curated collection of books across various genres including technology, personal development, fiction, and business. Goal: 24 books this year.',
                'user_id' => $users[1]->id,
                'created_at' => now()->subDays(25),
                'updated_at' => now()->subDays(10),
            ],
            [
                'title' => 'Home Renovation Ideas',
                'description' => 'Planning document for upcoming home improvements including kitchen remodeling, bathroom upgrades, and outdoor landscaping projects.',
                'user_id' => $users[1]->id,
                'created_at' => now()->subDays(7),
                'updated_at' => now()->subDays(2),
            ],

            // Items untuk user ketiga (Jane Smith)
            [
                'title' => 'Bali Vacation Itinerary',
                'description' => 'Detailed 10-day travel plan for Bali including flight details, hotel reservations, daily activities, restaurant recommendations, and cultural experiences.',
                'user_id' => $users[2]->id,
                'created_at' => now()->subDays(5),
                'updated_at' => now()->subDays(1),
            ],
            [
                'title' => 'Healthy Recipe Collection',
                'description' => 'Nutritionist-approved recipes for breakfast, lunch, and dinner. Includes ingredient lists, cooking instructions, nutritional information, and meal prep tips.',
                'user_id' => $users[2]->id,
                'created_at' => now()->subDays(15),
                'updated_at' => now()->subDays(3),
            ],
            [
                'title' => 'Professional Development Plan',
                'description' => 'Quarterly learning objectives including online courses, certifications, and skills to acquire. Focus on React.js, Node.js, and cloud technologies.',
                'user_id' => $users[2]->id,
                'created_at' => now()->subDays(30),
                'updated_at' => now()->subDays(8),
            ],
            [
                'title' => 'Photography Project Ideas',
                'description' => 'Creative photography concepts and themes to explore including street photography, portrait sessions, landscape, and experimental techniques.',
                'user_id' => $users[2]->id,
                'created_at' => now()->subDays(12),
                'updated_at' => now()->subDays(4),
            ],

            // Items untuk user keempat (Michael Johnson)
            [
                'title' => 'Startup Business Plan 2024',
                'description' => 'Comprehensive business plan for tech startup including market analysis, competitive research, financial projections, marketing strategy, and operational plan.',
                'user_id' => $users[3]->id,
                'created_at' => now()->subDays(45),
                'updated_at' => now()->subDays(15),
            ],
            [
                'title' => 'Quarterly Team Meeting Notes',
                'description' => 'Key discussion points, decisions, action items, and deadlines from recent team meetings. Includes project updates and resource allocation.',
                'user_id' => $users[3]->id,
                'created_at' => now()->subDays(10),
                'updated_at' => now()->subDays(2),
            ],
            [
                'title' => 'Client Acquisition Strategy',
                'description' => 'Proactive approach to identify potential clients, build relationships, and convert leads. Includes CRM setup and sales pipeline management.',
                'user_id' => $users[3]->id,
                'created_at' => now()->subDays(22),
                'updated_at' => now()->subDays(7),
            ],
            [
                'title' => 'Product Development Roadmap',
                'description' => 'Detailed timeline for product features, releases, and milestones. Includes user research, prototyping, testing, and deployment phases.',
                'user_id' => $users[3]->id,
                'created_at' => now()->subDays(35),
                'updated_at' => now()->subDays(12),
            ],

            // Items untuk user kelima (Sarah Wilson)
            [
                'title' => 'Annual Company Event Planning',
                'description' => 'Complete checklist for organizing the company annual conference including venue selection, catering, guest speakers, marketing, and budget management.',
                'user_id' => $users[4]->id,
                'created_at' => now()->subDays(60),
                'updated_at' => now()->subDays(20),
            ],
            [
                'title' => 'Personal Budget Tracker 2024',
                'description' => 'Monthly expense tracking system with categories (housing, transportation, food, entertainment), savings goals, and investment allocations.',
                'user_id' => $users[4]->id,
                'created_at' => now()->subDays(40),
                'updated_at' => now()->subDays(10),
            ],
            [
                'title' => 'Creative Writing Portfolio',
                'description' => 'Collection of short stories, blog post ideas, and writing prompts. Includes publishing schedule and content marketing strategy.',
                'user_id' => $users[4]->id,
                'created_at' => now()->subDays(25),
                'updated_at' => now()->subDays(5),
            ],
            [
                'title' => 'Volunteering Project Ideas',
                'description' => 'Community service initiatives and volunteering opportunities to participate in this year. Focus on education, environment, and social welfare.',
                'user_id' => $users[4]->id,
                'created_at' => now()->subDays(18),
                'updated_at' => now()->subDays(3),
            ],
        ];

        foreach ($items as $item) {
            Item::create($item);
        }

        $this->command->info('Items seeded successfully!');
        $this->command->info('Total users: ' . $users->count());
        $this->command->info('Total items created: ' . count($items));
        
        // Show sample login credentials
        $this->command->info('');
        $this->command->info('=== SAMPLE LOGIN CREDENTIALS ===');
        $this->command->info('Admin: admin@example.com / password123');
        $this->command->info('User 1: john@example.com / password123');
        $this->command->info('User 2: jane@example.com / password123');
        $this->command->info('User 3: michael@example.com / password123');
        $this->command->info('User 4: sarah@example.com / password123');
    }
}