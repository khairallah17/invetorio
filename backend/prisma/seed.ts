import { PrismaClient } from "@prisma/client"
import fs from "fs"
import path from "path"

const prisma = new PrismaClient()

async function deleteAllData(orderedFileNames: string[]) {

    const modelNames= orderedFileNames.map((fileName) => {
        const modelName = path.basename(fileName, path.extname(fileName))
        return modelName.charAt(0).toUpperCase() + modelName.slice(1)
    })

    for (const modelName of modelNames) {
        const model: any = prisma[modelName as keyof typeof prisma]
        if (model) {
            await model.deleteMany({})
            console.log(`Cleared Data from ${modelName}`)
        } else {
            console.error(
                `Model ${modelName} not NotFoundError. Please ensure that the model is coorect`
            )
        }
    }

}

async function main() {

    const dataDirectory = path.join(__dirname, "seedData")

    const orderedFilenames = [
        "products.json",
        "expenseSummary.json",
        "sales.json",
        "salesSummary.json",
        "purchases.json",
        "purchaseSummary.json",
        "users.json",
        "expenses.json",
        "expenseByCategory.json",
    ]

    await deleteAllData(orderedFilenames)

    for (const fileName of orderedFilenames) {
        const filePath = path.join(dataDirectory, fileName)
        const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"))
        const modelName = path.basename(fileName, path.extname(fileName))
        const model: any = prisma[modelName as keyof typeof prisma]

        if (!model) {
            console.error(`No Prisma model matches the filename: ${fileName}`)
            continue;
        }

        for (const data of jsonData) {
            await model.create({
                data
            })
        }

        console.log(`Seeded ${modelName} with data from ${fileName}`)

    }

}

main().catch(e => console.error(e)).finally(async () => await prisma.$disconnect())