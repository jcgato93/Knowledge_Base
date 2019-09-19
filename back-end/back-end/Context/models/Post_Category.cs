using System.ComponentModel.DataAnnotations.Schema;

namespace back_end.models
{
    /// <summary>
    /// Relation table between Post and Category.
    /// Necesary to Many-To-Many
    /// </summary>
    public class Post_Category
    {
        public string PostId { get; set; }
        public string CategoryId { get; set; }

        [ForeignKey(nameof(PostId))]
        public virtual Post Post { get; set; }

        [ForeignKey(nameof(CategoryId))]
        public virtual Category Category { get; set; }
    }
}