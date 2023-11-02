using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace pet_hotel_7._0.Migrations
{
    /// <inheritdoc />
    public partial class fourthMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CheckedIn",
                table: "Pets");

            migrationBuilder.RenameColumn(
                name: "CheckInDate",
                table: "Pets",
                newName: "CheckedInAt");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CheckedInAt",
                table: "Pets",
                newName: "CheckInDate");

            migrationBuilder.AddColumn<bool>(
                name: "CheckedIn",
                table: "Pets",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
