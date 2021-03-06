﻿using Domain.Entities;
using MediatR;
using Project.Application.Common.Exceptions;
using Project.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.FavoriteProjectItems.Commands.LikeOrDislikeProjectItem
{
    public class LikeOrDislikeProjectItemCommand : IRequest
    {
        public int Id { get; set; }

        public class LikeOrDislikeProjectItemCommandHandler : IRequestHandler<LikeOrDislikeProjectItemCommand>
        {
            private readonly IContext _context;

            public LikeOrDislikeProjectItemCommandHandler(IContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(LikeOrDislikeProjectItemCommand request, CancellationToken cancellationToken)
            {
                ProjectItem entity = await _context.ProjectItems.FindAsync(request.Id);

                if (entity is null)
                {
                    throw new NotFoundException(nameof(ProjectItem), request.Id);
                }

                entity.IsFavorite = !entity.IsFavorite;

                await _context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}
