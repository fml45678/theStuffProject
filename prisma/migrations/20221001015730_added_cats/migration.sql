-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "cat" TEXT NOT NULL,
    "subCat" TEXT NOT NULL,
    "subSubCat" TEXT NOT NULL,
    "subSubSubCat" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);
