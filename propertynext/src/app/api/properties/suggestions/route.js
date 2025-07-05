import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get search suggestions for autocomplete
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get('q') || '';
        const limit = parseInt(searchParams.get('limit') || '10');

        if (!query || query.length < 2) {
            return NextResponse.json({
                suggestions: [],
                message: "Query too short"
            });
        }

        // Get unique cities
        const cities = await prisma.property.findMany({
            where: {
                status: 'ACTIVE',
                city: {
                    contains: query,
                    mode: 'insensitive'
                }
            },
            select: {
                city: true,
                state: true
            },
            distinct: ['city'],
            take: 5
        });

        // Get property titles
        const properties = await prisma.property.findMany({
            where: {
                status: 'ACTIVE',
                title: {
                    contains: query,
                    mode: 'insensitive'
                }
            },
            select: {
                title: true,
                city: true,
                state: true
            },
            take: 5
        });

        // Get property types
        const propertyTypes = await prisma.property.findMany({
            where: {
                status: 'ACTIVE',
                propertyType: {
                    contains: query,
                    mode: 'insensitive'
                }
            },
            select: {
                propertyType: true
            },
            distinct: ['propertyType'],
            take: 3
        });

        // Format suggestions
        const suggestions = [];

        // Add city suggestions
        cities.forEach(item => {
            suggestions.push({
                type: 'location',
                text: `${item.city}, ${item.state}`,
                value: item.city,
                category: 'Cities'
            });
        });

        // Add property title suggestions
        properties.forEach(item => {
            suggestions.push({
                type: 'property',
                text: item.title,
                value: item.title,
                subtitle: `${item.city}, ${item.state}`,
                category: 'Properties'
            });
        });

        // Add property type suggestions
        propertyTypes.forEach(item => {
            suggestions.push({
                type: 'type',
                text: item.propertyType.charAt(0).toUpperCase() + item.propertyType.slice(1),
                value: item.propertyType,
                category: 'Property Types'
            });
        });

        // Limit total suggestions
        const limitedSuggestions = suggestions.slice(0, limit);

        return NextResponse.json({
            suggestions: limitedSuggestions,
            query,
            total: limitedSuggestions.length
        });

    } catch (error) {
        console.error("Error getting search suggestions:", error);
        return NextResponse.json(
            { error: "Failed to get suggestions" },
            { status: 500 }
        );
    }
}
