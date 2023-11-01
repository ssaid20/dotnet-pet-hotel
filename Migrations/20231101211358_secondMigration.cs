using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pet_hotel_7._0.Migrations
{
    /// <inheritdoc />
    public partial class secondMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pets_PetOwners_PetOwnerId",
                table: "Pets");

            migrationBuilder.DropColumn(
                name: "OwnedById",
                table: "Pets");

            migrationBuilder.RenameColumn(
                name: "PetOwnerId",
                table: "Pets",
                newName: "PetOwnerid");

            migrationBuilder.RenameIndex(
                name: "IX_Pets_PetOwnerId",
                table: "Pets",
                newName: "IX_Pets_PetOwnerid");

            migrationBuilder.AddForeignKey(
                name: "FK_Pets_PetOwners_PetOwnerid",
                table: "Pets",
                column: "PetOwnerid",
                principalTable: "PetOwners",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pets_PetOwners_PetOwnerid",
                table: "Pets");

            migrationBuilder.RenameColumn(
                name: "PetOwnerid",
                table: "Pets",
                newName: "PetOwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_Pets_PetOwnerid",
                table: "Pets",
                newName: "IX_Pets_PetOwnerId");

            migrationBuilder.AddColumn<int>(
                name: "OwnedById",
                table: "Pets",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Pets_PetOwners_PetOwnerId",
                table: "Pets",
                column: "PetOwnerId",
                principalTable: "PetOwners",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
