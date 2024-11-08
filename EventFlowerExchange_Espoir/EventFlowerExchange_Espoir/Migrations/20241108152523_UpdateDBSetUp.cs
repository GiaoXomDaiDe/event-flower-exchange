using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EventFlowerExchange_Espoir.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDBSetUp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SellerPost_PostDetail",
                table: "SellerPost");

            migrationBuilder.DropIndex(
                name: "IX_SellerPost_PDetailID",
                table: "SellerPost");

            migrationBuilder.DropColumn(
                name: "PDetailID",
                table: "SellerPost");

            migrationBuilder.AddColumn<string>(
                name: "EventId",
                table: "SellerPost",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PostId",
                table: "PostDetail",
                type: "varchar(255)",
                unicode: false,
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_SellerPost_EventId",
                table: "SellerPost",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_PostDetail_PostId",
                table: "PostDetail",
                column: "PostId");

            migrationBuilder.AddForeignKey(
                name: "FK_PostDetail_SellerPost",
                table: "PostDetail",
                column: "PostId",
                principalTable: "SellerPost",
                principalColumn: "PostID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SellerPost_Event",
                table: "SellerPost",
                column: "EventId",
                principalTable: "Event",
                principalColumn: "EventID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PostDetail_SellerPost",
                table: "PostDetail");

            migrationBuilder.DropForeignKey(
                name: "FK_SellerPost_Event",
                table: "SellerPost");

            migrationBuilder.DropIndex(
                name: "IX_SellerPost_EventId",
                table: "SellerPost");

            migrationBuilder.DropIndex(
                name: "IX_PostDetail_PostId",
                table: "PostDetail");

            migrationBuilder.DropColumn(
                name: "EventId",
                table: "SellerPost");

            migrationBuilder.DropColumn(
                name: "PostId",
                table: "PostDetail");

            migrationBuilder.AddColumn<string>(
                name: "PDetailID",
                table: "SellerPost",
                type: "varchar(255)",
                unicode: false,
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_SellerPost_PDetailID",
                table: "SellerPost",
                column: "PDetailID");

            migrationBuilder.AddForeignKey(
                name: "FK_SellerPost_PostDetail",
                table: "SellerPost",
                column: "PDetailID",
                principalTable: "PostDetail",
                principalColumn: "PDetailID");
        }
    }
}
