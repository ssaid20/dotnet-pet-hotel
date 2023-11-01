using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pet_hotel_7._0.Migrations
{
    /// <inheritdoc />
    public partial class thirdMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ColorType",
                table: "Pets",
                newName: "PetColor");

            migrationBuilder.RenameColumn(
                name: "BreedType",
                table: "Pets",
                newName: "PetBreed");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PetColor",
                table: "Pets",
                newName: "ColorType");

            migrationBuilder.RenameColumn(
                name: "PetBreed",
                table: "Pets",
                newName: "BreedType");
        }
    }
}
